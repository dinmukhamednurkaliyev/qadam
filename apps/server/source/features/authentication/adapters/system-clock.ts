import type { Clock } from '../ports/clock'

export function createSystemClock(): Clock {
  return {
    now() {
      return new Date()
    },
  }
}
