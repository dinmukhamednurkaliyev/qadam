import { createRequireAuthenticationMiddleware } from './authentication-middleware'
import { createAuthenticationRoute } from './authentication-route'
import type { AuthenticationService } from './authentication-service'
import type { SessionCookieManager } from './session-cookie'

export type AuthenticationModuleDependencies = {
  authenticationService: AuthenticationService
  sessionCookieManager: SessionCookieManager
}

export function createAuthenticationModule(dependencies: AuthenticationModuleDependencies) {
  const requireAuthentication = createRequireAuthenticationMiddleware(dependencies)

  return createAuthenticationRoute({
    ...dependencies,
    requireAuthentication: requireAuthentication,
  })
}
