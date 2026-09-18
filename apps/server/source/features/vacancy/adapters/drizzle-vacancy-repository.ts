import {
  type VacancyDetails,
  type VacancyFilters,
  type VacancyListItem,
} from '@qadam/shared/vacancy'
import { and, desc, eq, ilike, inArray } from 'drizzle-orm'

import type { database as applicationDatabase } from '@/database/database'
import { locationTable } from '@/database/schemas/location-schema'
import { organizationTable } from '@/database/schemas/organization-schema'
import { vacancyTable } from '@/database/schemas/vacancy-schema'

import type { VacancyRepository } from '../vacancy-repository'

type VacancyDatabase = Pick<typeof applicationDatabase, 'select'>

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

function createPublicQuery(database: VacancyDatabase) {
  return database
    .select(publicFields)
    .from(vacancyTable)
    .innerJoin(organizationTable, eq(vacancyTable.organizationId, organizationTable.id))
    .leftJoin(locationTable, eq(vacancyTable.locationId, locationTable.id))
}

function getPublicVacancyStatus(status: string): VacancyListItem['status'] {
  if (status === 'published' || status === 'closed') {
    return status
  }

  throw new Error(`Unexpected non-public vacancy status: ${status}`)
}

function serializeVacancy(
  vacancy: Awaited<ReturnType<typeof createPublicQuery>>[number],
): VacancyListItem {
  return {
    ...vacancy,
    createdAt: new Date(vacancy.createdAt).toISOString(),
    updatedAt: new Date(vacancy.updatedAt).toISOString(),
    status: getPublicVacancyStatus(vacancy.status),
    publishedAt: vacancy.publishedAt === null ? null : new Date(vacancy.publishedAt).toISOString(),
    closedAt: vacancy.closedAt === null ? null : new Date(vacancy.closedAt).toISOString(),
  }
}

export function createDrizzleVacancyRepository(database: VacancyDatabase): VacancyRepository {
  return {
    async findPublicVacancies(filters: VacancyFilters) {
      const search = filters.search?.replace(/[\\%_]/g, '\\$&')
      const vacancies = await createPublicQuery(database)
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
            filters.workplaceType
              ? eq(vacancyTable.workplaceType, filters.workplaceType)
              : undefined,
          ),
        )
        .orderBy(desc(vacancyTable.publishedAt), desc(vacancyTable.id))
        .limit(filters.limit)
        .offset(filters.offset)

      return vacancies.map(serializeVacancy)
    },

    async findPublicVacancyById(vacancyId: string): Promise<VacancyDetails | undefined> {
      const [vacancy] = await createPublicQuery(database)
        .where(
          and(
            eq(vacancyTable.id, vacancyId),
            eq(organizationTable.status, 'verified'),
            inArray(vacancyTable.status, ['published', 'closed']),
          ),
        )
        .limit(1)

      if (!vacancy) {
        return undefined
      }

      return serializeVacancy(vacancy)
    },
  }
}
