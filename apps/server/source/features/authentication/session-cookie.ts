import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { appConfiguration } from '@/app/app-configuration'

import type { CreatedSession } from './session-service'

const sessionCookieName = 'qadam_session'

export function readSessionToken(context: Context): string | undefined {
  return getCookie(context, sessionCookieName)
}

export function setSessionCookie(context: Context, session: CreatedSession): void {
  setCookie(context, sessionCookieName, session.token, {
    expires: session.expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'Lax',
    secure: appConfiguration.environment === 'production',
  })
}

export function clearSessionCookie(context: Context): void {
  deleteCookie(context, sessionCookieName, {
    path: '/',
    secure: appConfiguration.environment === 'production',
  })
}
