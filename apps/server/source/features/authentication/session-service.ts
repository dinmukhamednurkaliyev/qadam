import { createHash, randomBytes } from 'node:crypto'

import { database } from '@/database/database'
import { sessionTable } from '@/database/schemas/session-schema'

const sessionLifetimeMilliseconds = 7 * 24 * 60 * 60 * 1000

export type CreatedSession = {
  token: string
  expiresAt: Date
}

export async function createSession(userId: string): Promise<CreatedSession> {
  const token = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(token).digest('hex')
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
