import { signUpRequestSchema, signUpResponseSchema, type SignUpResponse } from '@qadam/shared'

import { database } from '@/database/database'
import { usersTable } from '@/database/schemas/user-schema'

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('An account with this email already exists')
    this.name = 'EmailAlreadyInUseError'
  }
}

export async function signUp(request: unknown): Promise<SignUpResponse> {
  const input = signUpRequestSchema.parse(request)

  const passwordHash = await Bun.password.hash(input.password, {
    algorithm: 'argon2id',
    memoryCost: 65536,
    timeCost: 2,
  })

  const [user] = await database
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

  return signUpResponseSchema.parse({
    user: {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerifiedAt !== null,
    },
  })
}
