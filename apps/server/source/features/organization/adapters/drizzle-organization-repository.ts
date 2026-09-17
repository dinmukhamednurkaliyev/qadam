import {
  organizationDetailsSchema,
  organizationListItemSchema,
  type OrganizationDetails,
  type OrganizationListItem,
} from '@qadam/shared/organization'
import { eq } from 'drizzle-orm'

import type { database as applicationDatabase } from '@/database/database'
import { organizationTable } from '@/database/schemas/organization-schema'

import type { OrganizationRepository } from '../organization-repository'

type OrganizationDatabase = Pick<typeof applicationDatabase, 'select'>

const publicFields = {
  id: organizationTable.id,
  name: organizationTable.name,
  slug: organizationTable.slug,
  legalName: organizationTable.legalName,
  registrationCountryCode: organizationTable.registrationCountryCode,
  registrationNumber: organizationTable.registrationNumber,
  contactEmail: organizationTable.contactEmail,
  website: organizationTable.website,
  description: organizationTable.description,
  status: organizationTable.status,
  verifiedAt: organizationTable.verifiedAt,
  createdAt: organizationTable.createdAt,
  updatedAt: organizationTable.updatedAt,
}

function serializeOrganization(
  organization: Awaited<ReturnType<typeof selectPublicOrganizations>>[number],
): OrganizationListItem {
  return organizationListItemSchema.parse({
    ...organization,
    verifiedAt:
      organization.verifiedAt === null ? null : new Date(organization.verifiedAt).toISOString(),
    createdAt: new Date(organization.createdAt).toISOString(),
    updatedAt: new Date(organization.updatedAt).toISOString(),
  })
}

function selectPublicOrganizations(database: OrganizationDatabase) {
  return database.select(publicFields).from(organizationTable)
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
        .where(eq(organizationTable.id, organizationId))
        .limit(1)

      return organization === undefined
        ? undefined
        : organizationDetailsSchema.parse(serializeOrganization(organization))
    },
  }
}
