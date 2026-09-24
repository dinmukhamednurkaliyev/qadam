import { locales, type Locale } from '@/localization/locales/locales'

import englishCommonMessages from './english/common.json'
import russianCommonMessages from './russian/common.json'

export interface LocalizationMessages {
  common: typeof englishCommonMessages
}

type MessageKeys<Messages> = {
  [Key in keyof Messages & string]: Messages[Key] extends string
    ? Key
    : Messages[Key] extends Record<string, unknown>
      ? `${Key}.${MessageKeys<Messages[Key]>}`
      : never
}[keyof Messages & string]

export type LocalizationMessageKey = MessageKeys<LocalizationMessages>

export const messages = {
  [locales.english]: {
    common: englishCommonMessages,
  },
  [locales.russian]: {
    common: russianCommonMessages,
  },
} satisfies Record<Locale, LocalizationMessages>
