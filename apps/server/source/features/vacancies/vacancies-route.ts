import {
  errorResponseScheme,
  vacancyDetailsSchema,
  vacancyFiltersSchema,
  vacancyListResponseSchema,
  vacancyParametersSchema,
} from '@qadam/shared'
import { and, desc, eq, ilike, inArray } from 'drizzle-orm'
import { Hono } from 'hono'

import { database } from '@/database/database'
import { locationTable } from '@/database/schemas/location-schema'
import { organizationTable } from '@/database/schemas/organization-schema'
import { vacancyTable } from '@/database/schemas/vacancy-schema'

const publicFields = {
  id: vacancyTable.id,
  title: vacancyTable.title,
  description: vacancyTable.description,
  createdAt: vacancyTable.createdAt,
  updatedAt: vacancyTable.updatedAt,
  status: vacancyTable.status,
  employmentType: vacancyTable.employmentType,
  workplaceType: vacancyTable.workplaceType,
  salaryFrom: vacancyTable.salaryFrom,
  salaryTo: vacancyTable.salaryTo,
  salaryCurrency: vacancyTable.salaryCurrency,
  publishedAt: vacancyTable.publishedAt,
  closedAt: vacancyTable.closedAt,
  organization: {
    id: organizationTable.id,
    name: organizationTable.name,
    website: organizationTable.website,
  },
  location: { id: locationTable.id, name: locationTable.name },
}

function publicQuery() {
  return database
    .select(publicFields)
    .from(vacancyTable)
    .innerJoin(organizationTable, eq(vacancyTable.organizationId, organizationTable.id))
    .leftJoin(locationTable, eq(vacancyTable.locationId, locationTable.id))
}

function serializeVacancy(row: Awaited<ReturnType<typeof publicQuery>>[number]) {
  return {
    ...row,
    createdAt: new Date(row.createdAt).toISOString(),
    updatedAt: new Date(row.updatedAt).toISOString(),
    publishedAt: row.publishedAt === null ? null : new Date(row.publishedAt).toISOString(),
    closedAt: row.closedAt === null ? null : new Date(row.closedAt).toISOString(),
  }
}

export const vacanciesRoute = new Hono()

vacanciesRoute.onError((error, context) => {
  console.error('Vacancies request failed:', error)
  return context.json(
    errorResponseScheme.parse({
      code: 'INTERNAL_ERROR',
      message: 'Unable to process vacancies request',
    }),
    500,
  )
})

vacanciesRoute.get('/', async (context) => {
  const parsed = vacancyFiltersSchema.safeParse(context.req.query())
  if (!parsed.success) {
    return context.json(
      errorResponseScheme.parse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid vacancy filters',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      }),
      400,
    )
  }

  const filters = parsed.data
  const search = filters.search?.replace(/[\\%_]/g, '\\$&')
  const rows = await publicQuery()
    .where(
      and(
        eq(organizationTable.status, 'verified'),
        eq(vacancyTable.status, 'published'),
        search ? ilike(vacancyTable.title, `%${search}%`) : undefined,
        filters.organizationId
          ? eq(vacancyTable.organizationId, filters.organizationId)
          : undefined,
        filters.locationId ? eq(vacancyTable.locationId, filters.locationId) : undefined,
        filters.employmentType
          ? eq(vacancyTable.employmentType, filters.employmentType)
          : undefined,
        filters.workplaceType ? eq(vacancyTable.workplaceType, filters.workplaceType) : undefined,
      ),
    )
    .orderBy(desc(vacancyTable.publishedAt), desc(vacancyTable.id))
    .limit(filters.limit)
    .offset(filters.offset)

  return context.json(vacancyListResponseSchema.parse(rows.map(serializeVacancy)))
})

vacanciesRoute.get('/:id', async (context) => {
  const parsed = vacancyParametersSchema.safeParse(context.req.param())
  if (!parsed.success) {
    return context.json(
      errorResponseScheme.parse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid vacancy ID',
      }),
      400,
    )
  }

  const [row] = await publicQuery()
    .where(
      and(
        eq(vacancyTable.id, parsed.data.id),
        eq(organizationTable.status, 'verified'),
        inArray(vacancyTable.status, ['published', 'closed']),
      ),
    )
    .limit(1)

  if (!row) {
    return context.json(
      errorResponseScheme.parse({
        code: 'NOT_FOUND',
        message: 'Vacancy not found',
      }),
      404,
    )
  }

  return context.json(vacancyDetailsSchema.parse(serializeVacancy(row)))
})
