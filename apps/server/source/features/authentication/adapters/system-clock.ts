import type { Clock } from '../clock'

export function createSystemClock(): Clock {
  return {
    now() {
      return new Date()
    },
  }
}
