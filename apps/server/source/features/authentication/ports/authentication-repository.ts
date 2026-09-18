import type { AuthenticatedUser } from '@qadam/shared/authentication'

export type AuthenticationUser = {
  id: string
  email: string
  passwordHash: string
  emailVerifiedAt: string | null
}

export type CreateAuthenticationUser = {
  email: string
  passwordHash: string
}

export type CreateSession = {
  userId: string
  tokenHash: string
  expiresAt: Date
}

export interface AuthenticationRepository {
  createUser(input: CreateAuthenticationUser): Promise<AuthenticationUser | undefined>
  findUserByEmail(email: string): Promise<AuthenticationUser | undefined>
  createSession(input: CreateSession): Promise<void>
  findActiveUserBySessionTokenHash(
    tokenHash: string,
    currentDate: Date,
  ): Promise<AuthenticatedUser | undefined>
  deleteSessionByTokenHash(tokenHash: string): Promise<void>
}

export interface AuthenticationTransaction {
  execute<Result>(
    operation: (authenticationRepository: AuthenticationRepository) => Promise<Result>,
  ): Promise<Result>
}
