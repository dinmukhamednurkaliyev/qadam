import { currentUserResponseSchema, errorResponseSchema } from '@qadam/shared'
import { Hono } from 'hono'

import { requireAuthentication } from './authentication-middleware'

export const currentUserRoute = new Hono()

currentUserRoute.onError((error, context) => {
  return context.json(
    errorResponseSchema.parse({
      code: 'INTERNAL_ERROR',
      message: 'Unable to retrieve the current user',
    }),
    500,
  )
})

currentUserRoute.get('/', requireAuthentication, (context) => {
  const currentUser = context.get('currentUser')

  return context.json(currentUserResponseSchema.parse({ user: currentUser }))
})
