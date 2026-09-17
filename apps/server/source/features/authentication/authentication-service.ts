import type { AuthenticatedUser, SignInRequest, SignUpRequest } from '@qadam/shared/authentication'

import type {
  AuthenticationRepository,
  AuthenticationTransaction,
  AuthenticationUser,
} from './authentication-repository'
import type { Clock } from './clock'
import type { PasswordHasher } from './password-hasher'
import type { SessionTokenGenerator } from './session-token-generator'

const fallbackPasswordHash =
  '$argon2id$v=19$m=65536,t=2,p=1$dJq/ZeJPkAJR2WiQLZ5KUaq4T4sNJib8tMLmnh/8fmc$IAiTW64GUKMdxb/ZT2BX0bRN5C5ZSGHnPT8XkospyBg'
const sessionLifetimeMilliseconds = 7 * 24 * 60 * 60 * 1000

export type AuthenticationSession = {
  token: string
  expiresAt: Date
}

export type AuthenticationResult = {
  user: AuthenticatedUser
  session: AuthenticationSession
}

export interface AuthenticationService {
  signUp(input: SignUpRequest): Promise<AuthenticationResult>
  signIn(input: SignInRequest): Promise<AuthenticationResult>
  getCurrentUser(sessionToken: string): Promise<AuthenticatedUser | undefined>
  signOut(sessionToken: string): Promise<void>
}

export type AuthenticationServiceDependencies = {
  authenticationRepository: AuthenticationRepository
  authenticationTransaction: AuthenticationTransaction
  passwordHasher: PasswordHasher
  sessionTokenGenerator: SessionTokenGenerator
  clock: Clock
}

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('An account with this email already exists')
    this.name = 'EmailAlreadyInUseError'
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or password')
    this.name = 'InvalidCredentialsError'
  }
}

function toAuthenticatedUser(user: AuthenticationUser): AuthenticatedUser {
  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerifiedAt !== null,
  }
}

export function createAuthenticationService(
  dependencies: AuthenticationServiceDependencies,
): AuthenticationService {
  async function createSession(
    authenticationRepository: AuthenticationRepository,
    userId: string,
  ): Promise<AuthenticationSession> {
    const token = dependencies.sessionTokenGenerator.generate()
    const expiresAt = new Date(dependencies.clock.now().getTime() + sessionLifetimeMilliseconds)

    await authenticationRepository.createSession({
      userId: userId,
      tokenHash: dependencies.sessionTokenGenerator.hash(token),
      expiresAt: expiresAt,
    })

    return {
      token: token,
      expiresAt: expiresAt,
    }
  }

  return {
    async signUp(input) {
      const passwordHash = await dependencies.passwordHasher.hash(input.password)

      return dependencies.authenticationTransaction.execute(async (authenticationRepository) => {
        const user = await authenticationRepository.createUser({
          email: input.email,
          passwordHash: passwordHash,
        })

        if (!user) {
          throw new EmailAlreadyInUseError()
        }

        const session = await createSession(authenticationRepository, user.id)

        return {
          user: toAuthenticatedUser(user),
          session: session,
        }
      })
    },

    async signIn(input) {
      const user = await dependencies.authenticationRepository.findUserByEmail(input.email)
      const passwordHash = user?.passwordHash ?? fallbackPasswordHash
      const passwordMatches = await dependencies.passwordHasher.verify(input.password, passwordHash)

      if (!user || !passwordMatches) {
        throw new InvalidCredentialsError()
      }

      const session = await createSession(dependencies.authenticationRepository, user.id)

      return {
        user: toAuthenticatedUser(user),
        session: session,
      }
    },

    async getCurrentUser(sessionToken) {
      return dependencies.authenticationRepository.findActiveUserBySessionTokenHash(
        dependencies.sessionTokenGenerator.hash(sessionToken),
        dependencies.clock.now(),
      )
    },

    async signOut(sessionToken) {
      await dependencies.authenticationRepository.deleteSessionByTokenHash(
        dependencies.sessionTokenGenerator.hash(sessionToken),
      )
    },
  }
}
