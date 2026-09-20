import englishCommonMessages from './english/common.json'
import kazakhCommonMessages from './kazakh/common.json'
import russianCommonMessages from './russian/common.json'

type CommonMessages = typeof englishCommonMessages

export const messages = {
  english: {
    common: englishCommonMessages,
  },
  russian: {
    common: russianCommonMessages,
  },
  kazakh: {
    common: kazakhCommonMessages,
  },
} satisfies Record<string, { common: CommonMessages }>

export type Locale = keyof typeof messages
