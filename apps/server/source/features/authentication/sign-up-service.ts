import { signUpResponseSchema, type SignUpRequest, type SignUpResponse } from '@qadam/shared'

import { database } from '@/database/database'
import { usersTable } from '@/database/schemas/user-schema'

import { createSession, type CreatedSession } from './session-service'

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('An account with this email already exists')
    this.name = 'EmailAlreadyInUseError'
  }
}

export type SignUpResult = {
  response: SignUpResponse
  session: CreatedSession
}

export async function signUp(input: SignUpRequest): Promise<SignUpResult> {
  const passwordHash = await Bun.password.hash(input.password, {
    algorithm: 'argon2id',
    memoryCost: 65536,
    timeCost: 2,
  })

  return database.transaction(async (transaction) => {
    const [user] = await transaction
      .insert(usersTable)
      .values({
        email: input.email,
        passwordHash: passwordHash,
        platformRole: 'user',
      })
      .onConflictDoNothing()
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        emailVerifiedAt: usersTable.emailVerifiedAt,
      })

    if (!user) {
      throw new EmailAlreadyInUseError()
    }

    const response = signUpResponseSchema.parse({
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerifiedAt !== null,
      },
    })

    const session = await createSession(user.id, transaction)

    return {
      response: response,
      session: session,
    }
  })
}
