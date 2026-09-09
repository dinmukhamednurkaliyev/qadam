import { signInResponseSchema, type SignInRequest, type SignInResponse } from '@qadam/shared'
import { sql } from 'drizzle-orm'

import { database } from '@/database/database'
import { usersTable } from '@/database/schemas/user-schema'

import { createSession, type CreatedSession } from './session-service'

export type SignInResult = {
  response: SignInResponse
  session: CreatedSession
}

const fallbackPasswordHash =
  '$argon2id$v=19$m=65536,t=2,p=1$dJq/ZeJPkAJR2WiQLZ5KUaq4T4sNJib8tMLmnh/8fmc$IAiTW64GUKMdxb/ZT2BX0bRN5C5ZSGHnPT8XkospyBg'

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or password')
    this.name = 'InvalidCredentialsError'
  }
}

export async function signIn(input: SignInRequest): Promise<SignInResult> {
  const [user] = await database
    .select({
      id: usersTable.id,
      email: usersTable.email,
      passwordHash: usersTable.passwordHash,
      emailVerifiedAt: usersTable.emailVerifiedAt,
    })
    .from(usersTable)
    .where(sql`lower(${usersTable.email}) = ${input.email}`)
    .limit(1)

  const passwordHash = user?.passwordHash ?? fallbackPasswordHash
  const passwordMatches = await Bun.password.verify(input.password, passwordHash)

  if (!user || !passwordMatches) {
    throw new InvalidCredentialsError()
  }

  const response = signInResponseSchema.parse({
    user: {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerifiedAt !== null,
    },
  })

  const session = await createSession(user.id)

  return {
    response: response,
    session: session,
  }
}
