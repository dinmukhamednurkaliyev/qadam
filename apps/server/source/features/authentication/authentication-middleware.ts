import { errorResponseSchema } from '@qadam/shared'
import { createMiddleware } from 'hono/factory'

import { findUserBySessionToken, type AuthenticatedUser } from './session-service'
import { readSessionToken } from './session-cookie'

declare module 'hono' {
  interface ContextVariableMap {
    currentUser: AuthenticatedUser
  }
}

function unauthorizedResponse() {
  return errorResponseSchema.parse({
    code: 'UNAUTHORIZED',
    message: 'Authentication is required',
  })
}

export const requireAuthentication = createMiddleware(async (context, next) => {
  const sessionToken = readSessionToken(context)

  if (!sessionToken) {
    return context.json(unauthorizedResponse(), 401)
  }

  const currentUser = await findUserBySessionToken(sessionToken)

  if (!currentUser) {
    return context.json(unauthorizedResponse(), 401)
  }

  context.set('currentUser', currentUser)

  await next()
})
