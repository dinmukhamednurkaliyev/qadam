import { errorResponseSchema, signInRequestSchema } from '@qadam/shared'
import { Hono } from 'hono'

import { InvalidCredentialsError, signIn } from './sign-in-service'
import { setSessionCookie } from './session-cookie'

export const signInRoute = new Hono()

signInRoute.onError((error, context) => {
  if (error instanceof InvalidCredentialsError) {
    return context.json(
      errorResponseSchema.parse({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      }),
      401,
    )
  }

  return context.json(
    errorResponseSchema.parse({
      code: 'INTERNAL_ERROR',
      message: 'Unable to sign in',
    }),
    500,
  )
})

signInRoute.post('/', async (context) => {
  let request: unknown

  try {
    request = await context.req.json()
  } catch {
    return context.json(
      errorResponseSchema.parse({
        code: 'VALIDATION_ERROR',
        message: 'Request body must contain valid JSON',
      }),
      400,
    )
  }

  const validation = signInRequestSchema.safeParse(request)

  if (!validation.success) {
    return context.json(
      errorResponseSchema.parse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid sign in data',
        issues: validation.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      }),
      400,
    )
  }

  const result = await signIn(validation.data)

  setSessionCookie(context, result.session)

  return context.json(result.response)
})
