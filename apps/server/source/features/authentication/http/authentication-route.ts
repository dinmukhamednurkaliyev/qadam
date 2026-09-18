import {
  currentUserResponseSchema,
  signInRequestSchema,
  signInResponseSchema,
  signUpRequestSchema,
  signUpResponseSchema,
} from '@qadam/shared/authentication'
import { errorResponseSchema } from '@qadam/shared/http'
import { Hono } from 'hono'
import type { MiddlewareHandler } from 'hono'

import {
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  type AuthenticationService,
} from '../authentication-service'
import type { SessionCookieManager } from './session-cookie'

export type AuthenticationRouteDependencies = {
  authenticationService: AuthenticationService
  sessionCookieManager: SessionCookieManager
  requireAuthentication: MiddlewareHandler
}

export function createAuthenticationRoute(dependencies: AuthenticationRouteDependencies): Hono {
  const authenticationRoute = new Hono()

  authenticationRoute.onError((error, context) => {
    if (error instanceof EmailAlreadyInUseError) {
      return context.json(
        errorResponseSchema.parse({
          code: 'CONFLICT',
          message: error.message,
        }),
        409,
      )
    }

    if (error instanceof InvalidCredentialsError) {
      return context.json(
        errorResponseSchema.parse({
          code: 'UNAUTHORIZED',
          message: error.message,
        }),
        401,
      )
    }

    return context.json(
      errorResponseSchema.parse({
        code: 'INTERNAL_ERROR',
        message: 'Unable to process authentication request',
      }),
      500,
    )
  })

  authenticationRoute.post('/sign-up', async (context) => {
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

    const result = await dependencies.authenticationService.signUp(validation.data)

    dependencies.sessionCookieManager.setSession(context, result.session)

    return context.json(signUpResponseSchema.parse({ user: result.user }), 201)
  })

  authenticationRoute.post('/sign-in', async (context) => {
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

    const result = await dependencies.authenticationService.signIn(validation.data)

    dependencies.sessionCookieManager.setSession(context, result.session)

    return context.json(signInResponseSchema.parse({ user: result.user }))
  })

  authenticationRoute.get('/current-user', dependencies.requireAuthentication, (context) => {
    return context.json(currentUserResponseSchema.parse({ user: context.get('currentUser') }))
  })

  authenticationRoute.post('/sign-out', dependencies.requireAuthentication, async (context) => {
    await dependencies.authenticationService.signOut(context.get('sessionToken'))

    dependencies.sessionCookieManager.clearSession(context)

    return context.body(null, 204)
  })

  return authenticationRoute
}
