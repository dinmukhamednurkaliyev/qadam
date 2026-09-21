import { locales, type Locale } from '@/localization/locales/locales'

import englishCommonMessages from './english/common.json'
import kazakhCommonMessages from './kazakh/common.json'
import russianCommonMessages from './russian/common.json'

// English defines the required message keys for every translation.
interface LocalizationMessages {
  common: typeof englishCommonMessages
}

/** Provides complete dictionaries for every supported locale, checked against the English schema. */
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
