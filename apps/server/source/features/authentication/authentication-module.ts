import { createRequireAuthenticationMiddleware } from './http/authentication-middleware'
import { createAuthenticationRoute } from './http/authentication-route'
import type { SessionCookieManager } from './http/session-cookie'
import type { AuthenticationService } from './authentication-service'

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
