import type { AuthenticatedUser } from '@qadam/shared/authentication'
import { and, eq, gt, sql } from 'drizzle-orm'

import type { database as applicationDatabase } from '@/database/database'
import { sessionTable } from '@/database/schemas/session-schema'
import { usersTable } from '@/database/schemas/user-schema'

import type {
  AuthenticationRepository,
  AuthenticationTransaction,
  AuthenticationUser,
  CreateAuthenticationUser,
  CreateSession,
} from '../ports/authentication-repository'

type AuthenticationDatabase = Pick<typeof applicationDatabase, 'delete' | 'insert' | 'select'>

function toAuthenticationUser(user: AuthenticationUser): AuthenticatedUser {
  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerifiedAt !== null,
  }
}

export function createDrizzleAuthenticationRepository(
  database: AuthenticationDatabase,
): AuthenticationRepository {
  return {
    async createUser(input: CreateAuthenticationUser) {
      const [user] = await database
        .insert(usersTable)
        .values({
          email: input.email,
          passwordHash: input.passwordHash,
          platformRole: 'user',
        })
        .onConflictDoNothing()
        .returning({
          id: usersTable.id,
          email: usersTable.email,
          passwordHash: usersTable.passwordHash,
          emailVerifiedAt: usersTable.emailVerifiedAt,
        })

      return user
    },

    async findUserByEmail(email) {
      const [user] = await database
        .select({
          id: usersTable.id,
          email: usersTable.email,
          passwordHash: usersTable.passwordHash,
          emailVerifiedAt: usersTable.emailVerifiedAt,
        })
        .from(usersTable)
        .where(sql`lower(${usersTable.email}) = ${email}`)
        .limit(1)

      return user
    },

    async createSession(input: CreateSession) {
      await database.insert(sessionTable).values({
        userId: input.userId,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt.toISOString(),
      })
    },

    async findActiveUserBySessionTokenHash(tokenHash, currentDate) {
      const [user] = await database
        .select({
          id: usersTable.id,
          email: usersTable.email,
          passwordHash: usersTable.passwordHash,
          emailVerifiedAt: usersTable.emailVerifiedAt,
        })
        .from(sessionTable)
        .innerJoin(usersTable, eq(sessionTable.userId, usersTable.id))
        .where(
          and(
            eq(sessionTable.tokenHash, tokenHash),
            gt(sessionTable.expiresAt, currentDate.toISOString()),
          ),
        )
        .limit(1)

      return user ? toAuthenticationUser(user) : undefined
    },

    async deleteSessionByTokenHash(tokenHash) {
      await database.delete(sessionTable).where(eq(sessionTable.tokenHash, tokenHash))
    },
  }
}

export function createDrizzleAuthenticationTransaction(
  database: typeof applicationDatabase,
): AuthenticationTransaction {
  return {
    async execute(operation) {
      return database.transaction(async (transaction) => {
        return operation(createDrizzleAuthenticationRepository(transaction))
      })
    },
  }
}
