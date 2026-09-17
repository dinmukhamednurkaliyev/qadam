import { appConfiguration } from '@/app/app-configuration'
import { database } from '@/database/database'
import {
  createBunPasswordHasher,
  createDrizzleAuthenticationRepository,
  createDrizzleAuthenticationTransaction,
  createNodeSessionTokenGenerator,
  createSystemClock,
} from '@/features/authentication/adapters'
import { createAuthenticationModule } from '@/features/authentication/authentication-module'
import { createAuthenticationService } from '@/features/authentication/authentication-service'
import { createSessionCookieManager } from '@/features/authentication/session-cookie'
import { createDrizzleOrganizationRepository } from '@/features/organization/adapters'
import { createOrganizationModule } from '@/features/organization/organization-module'
import { createOrganizationService } from '@/features/organization/organization-service'
import { createDrizzleVacancyRepository } from '@/features/vacancy/adapters'
import { createVacancyModule } from '@/features/vacancy/vacancy-module'
import { createVacancyService } from '@/features/vacancy/vacancy-service'

export function createAppModules() {
  const authenticationRepository = createDrizzleAuthenticationRepository(database)
  const authenticationService = createAuthenticationService({
    authenticationRepository: authenticationRepository,
    authenticationTransaction: createDrizzleAuthenticationTransaction(database),
    passwordHasher: createBunPasswordHasher(),
    sessionTokenGenerator: createNodeSessionTokenGenerator(),
    clock: createSystemClock(),
  })

  return {
    authentication: createAuthenticationModule({
      authenticationService: authenticationService,
      sessionCookieManager: createSessionCookieManager({
        secure: appConfiguration.environment === 'production',
      }),
    }),
    organization: createOrganizationModule({
      organizationService: createOrganizationService(createDrizzleOrganizationRepository(database)),
    }),
    vacancy: createVacancyModule({
      vacancyService: createVacancyService(createDrizzleVacancyRepository(database)),
    }),
  }
}
