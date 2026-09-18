import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import type { AuthenticationSession } from '../authentication-service'

export interface SessionCookieManager {
  readSessionToken(context: Context): string | undefined
  setSession(context: Context, session: AuthenticationSession): void
  clearSession(context: Context): void
}

export type SessionCookieManagerDependencies = {
  secure: boolean
}

export function createSessionCookieManager(
  dependencies: SessionCookieManagerDependencies,
): SessionCookieManager {
  const sessionCookieName = 'qadam_session'

  return {
    readSessionToken(context) {
      return getCookie(context, sessionCookieName)
    },

    setSession(context, session) {
      setCookie(context, sessionCookieName, session.token, {
        expires: session.expiresAt,
        httpOnly: true,
        path: '/',
        sameSite: 'Lax',
        secure: dependencies.secure,
      })
    },

    clearSession(context) {
      deleteCookie(context, sessionCookieName, {
        path: '/',
        secure: dependencies.secure,
      })
    },
  }
}
