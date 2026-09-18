import { createHash, randomBytes } from 'node:crypto'

import type { SessionTokenGenerator } from '../ports/session-token-generator'

export function createNodeSessionTokenGenerator(): SessionTokenGenerator {
  return {
    generate() {
      return randomBytes(32).toString('hex')
    },

    hash(token) {
      return createHash('sha256').update(token).digest('hex')
    },
  }
}
