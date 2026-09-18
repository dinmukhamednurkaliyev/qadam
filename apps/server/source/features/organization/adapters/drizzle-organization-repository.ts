import { type OrganizationDetails, type OrganizationListItem } from '@qadam/shared/organization'
import { and, eq } from 'drizzle-orm'

import type { database as applicationDatabase } from '@/database/database'
import { organizationTable } from '@/database/schemas/organization-schema'

import type { OrganizationRepository } from '../organization-repository'

type OrganizationDatabase = Pick<typeof applicationDatabase, 'select'>

const publicFields = {
  id: organizationTable.id,
  name: organizationTable.name,
  slug: organizationTable.slug,
  website: organizationTable.website,
  description: organizationTable.description,
  verifiedAt: organizationTable.verifiedAt,
}

function serializeOrganization(
  organization: Awaited<ReturnType<typeof selectPublicOrganizations>>[number],
): OrganizationListItem {
  return {
    ...organization,
    verifiedAt:
      organization.verifiedAt === null ? null : new Date(organization.verifiedAt).toISOString(),
  }
}

function selectPublicOrganizations(database: OrganizationDatabase) {
  return database
    .select(publicFields)
    .from(organizationTable)
    .where(eq(organizationTable.status, 'verified'))
}

export function createDrizzleOrganizationRepository(
  database: OrganizationDatabase,
): OrganizationRepository {
  return {
    async findOrganizations() {
      const organizations = await selectPublicOrganizations(database)

      return organizations.map(serializeOrganization)
    },

    async findOrganizationById(organizationId: string): Promise<OrganizationDetails | undefined> {
      const [organization] = await database
        .select(publicFields)
        .from(organizationTable)
        .where(
          and(eq(organizationTable.id, organizationId), eq(organizationTable.status, 'verified')),
        )
        .limit(1)

      return organization === undefined ? undefined : serializeOrganization(organization)
    },
  }
}
