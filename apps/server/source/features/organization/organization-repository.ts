import type { OrganizationDetails, OrganizationListItem } from '@qadam/shared/organization'

export interface OrganizationRepository {
  findOrganizations(): Promise<OrganizationListItem[]>
  findOrganizationById(organizationId: string): Promise<OrganizationDetails | undefined>
}
