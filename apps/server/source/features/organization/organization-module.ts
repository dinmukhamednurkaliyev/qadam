import { createOrganizationRoute } from './organization-route'
import type { OrganizationService } from './organization-service'

export type OrganizationModuleDependencies = {
  organizationService: OrganizationService
}

export function createOrganizationModule(dependencies: OrganizationModuleDependencies) {
  return createOrganizationRoute(dependencies.organizationService)
}
