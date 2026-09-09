import { errorResponseSchema, signUpRequestSchema } from '@qadam/shared'
import { Hono } from 'hono'

import { EmailAlreadyInUseError, signUp } from './sign-up-service'

export const signUpRoute = new Hono()

signUpRoute.onError((error, context) => {
  if (error instanceof EmailAlreadyInUseError) {
    return context.json(
      errorResponseSchema.parse({
        code: 'CONFLICT',
        message: error.message,
      }),
      409,
    )
  }

  return context.json(
    errorResponseSchema.parse({
      code: 'INTERNAL_ERROR',
      message: 'Unable to create account',
    }),
    500,
  )
})

signUpRoute.post('/', async (context) => {
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

  const validation = signUpRequestSchema.safeParse(request)

  if (!validation.success) {
    return context.json(
      errorResponseSchema.parse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid sign up data',
        issues: validation.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      }),
      400,
    )
  }

  const response = await signUp(validation.data)

  return context.json(response, 201)
})
