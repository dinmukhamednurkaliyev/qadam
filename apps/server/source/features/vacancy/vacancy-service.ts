import {
  vacancyDetailsSchema,
  vacancyListResponseSchema,
  type VacancyFilters,
  type VacancyDetails,
  type VacancyListResponse,
} from '@qadam/shared'
import { and, desc, eq, ilike, inArray } from 'drizzle-orm'

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

export async function getVacancies(filters: VacancyFilters): Promise<VacancyListResponse> {
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

  return vacancyListResponseSchema.parse(rows.map(serializeVacancy))
}

export async function getVacancy(vacancyId: string): Promise<VacancyDetails | null> {
  const [row] = await publicQuery()
    .where(
      and(
        eq(vacancyTable.id, vacancyId),
        eq(organizationTable.status, 'verified'),
        inArray(vacancyTable.status, ['published', 'closed']),
      ),
    )
    .limit(1)

  if (!row) {
    return null
  }

  return vacancyDetailsSchema.parse(serializeVacancy(row))
}
