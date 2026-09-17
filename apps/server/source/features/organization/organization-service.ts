import {
  organizationDetailsSchema,
  organizationListResponseSchema,
  type OrganizationDetails,
  type OrganizationListResponse,
} from '@qadam/shared/organization'

import type { OrganizationRepository } from './organization-repository'

export interface OrganizationService {
  getOrganizations(): Promise<OrganizationListResponse>
  getOrganization(organizationId: string): Promise<OrganizationDetails | undefined>
}

export function createOrganizationService(
  organizationRepository: OrganizationRepository,
): OrganizationService {
  return {
    async getOrganizations() {
      return organizationListResponseSchema.parse(await organizationRepository.findOrganizations())
    },

    async getOrganization(organizationId) {
      const organization = await organizationRepository.findOrganizationById(organizationId)

      return organization === undefined ? undefined : organizationDetailsSchema.parse(organization)
    },
  }
}
