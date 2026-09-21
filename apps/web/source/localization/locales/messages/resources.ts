import { locales, type Locale } from '@/localization/locales/locales'

import englishCommonMessages from './english/common.json'
import kazakhCommonMessages from './kazakh/common.json'
import russianCommonMessages from './russian/common.json'

interface LocalizationMessages {
  common: typeof englishCommonMessages
}

export const messages = {
  [locales.english]: {
    common: englishCommonMessages,
  },
  [locales.russian]: {
    common: russianCommonMessages,
  },
  [locales.kazakh]: {
    common: kazakhCommonMessages,
  },
} satisfies Record<Locale, LocalizationMessages>
