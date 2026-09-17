import { errorResponseSchema } from '@qadam/shared'
import { Hono } from 'hono'

import { requireAuthentication } from './authentication-middleware'
import { clearSessionCookie, readSessionToken } from './session-cookie'
import { deleteSessionByToken } from './session-service'

export const signOutRoute = new Hono()

signOutRoute.onError((error, context) => {
  return context.json(
    errorResponseSchema.parse({
      code: 'INTERNAL_ERROR',
      message: 'Unable to sign out',
    }),
    500,
  )
})

signOutRoute.post('/', requireAuthentication, async (context) => {
  const sessionToken = readSessionToken(context)

  if (sessionToken) {
    await deleteSessionByToken(sessionToken)
  }

  clearSessionCookie(context)

  return context.body(null, 204)
})
