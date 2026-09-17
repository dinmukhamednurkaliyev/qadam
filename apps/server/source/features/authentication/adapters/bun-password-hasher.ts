import type { PasswordHasher } from '../password-hasher'

export function createBunPasswordHasher(): PasswordHasher {
  return {
    async hash(password) {
      return Bun.password.hash(password, {
        algorithm: 'argon2id',
        memoryCost: 65536,
        timeCost: 2,
      })
    },

    async verify(password, passwordHash) {
      return Bun.password.verify(password, passwordHash)
    },
  }
}
