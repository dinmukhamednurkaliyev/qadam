import type { AuthenticatedUser } from '@qadam/shared/authentication'
import { errorResponseSchema } from '@qadam/shared/http'
import { createMiddleware } from 'hono/factory'

import type { AuthenticationService } from '../authentication-service'
import type { SessionCookieManager } from './session-cookie'

declare module 'hono' {
  interface ContextVariableMap {
    currentUser: AuthenticatedUser
    sessionToken: string
  }
}

export type AuthenticationMiddlewareDependencies = {
  authenticationService: AuthenticationService
  sessionCookieManager: SessionCookieManager
}

function createUnauthorizedResponse() {
  return errorResponseSchema.parse({
    code: 'UNAUTHORIZED',
    message: 'Authentication is required',
  })
}

export function createRequireAuthenticationMiddleware(
  dependencies: AuthenticationMiddlewareDependencies,
) {
  return createMiddleware(async (context, next) => {
    const sessionToken = dependencies.sessionCookieManager.readSessionToken(context)

    if (!sessionToken) {
      return context.json(createUnauthorizedResponse(), 401)
    }

    const currentUser = await dependencies.authenticationService.getCurrentUser(sessionToken)

    if (!currentUser) {
      return context.json(createUnauthorizedResponse(), 401)
    }

    context.set('currentUser', currentUser)
    context.set('sessionToken', sessionToken)

    await next()
  })
}
