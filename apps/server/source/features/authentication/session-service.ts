import { createHash, randomBytes } from 'node:crypto'

import { and, eq, gt } from 'drizzle-orm'

import { database } from '@/database/database'
import { sessionTable } from '@/database/schemas/session-schema'
import { usersTable } from '@/database/schemas/user-schema'

const sessionLifetimeMilliseconds = 7 * 24 * 60 * 60 * 1000

export type CreatedSession = {
  token: string
  expiresAt: Date
}

export type AuthenticatedUser = {
  id: string
  email: string
  emailVerified: boolean
}

function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function createSession(userId: string): Promise<CreatedSession> {
  const token = randomBytes(32).toString('hex')
  const tokenHash = hashSessionToken(token)
  const expiresAt = new Date(Date.now() + sessionLifetimeMilliseconds)

  await database.insert(sessionTable).values({
    userId: userId,
    tokenHash: tokenHash,
    expiresAt: expiresAt.toISOString(),
  })

  return {
    token: token,
    expiresAt: expiresAt,
  }
}

export async function findUserBySessionToken(
  token: string,
): Promise<AuthenticatedUser | undefined> {
  const [user] = await database
    .select({
      id: usersTable.id,
      email: usersTable.email,
      emailVerifiedAt: usersTable.emailVerifiedAt,
    })
    .from(sessionTable)
    .innerJoin(usersTable, eq(sessionTable.userId, usersTable.id))
    .where(
      and(
        eq(sessionTable.tokenHash, hashSessionToken(token)),
        gt(sessionTable.expiresAt, new Date().toISOString()),
      ),
    )
    .limit(1)

  if (!user) {
    return undefined
  }

  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerifiedAt !== null,
  }
}

export async function deleteSessionByToken(token: string): Promise<void> {
  await database.delete(sessionTable).where(eq(sessionTable.tokenHash, hashSessionToken(token)))
}
