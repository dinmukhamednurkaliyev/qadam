import englishCommonMessages from './locales/messages/english/common.json'
import englishVacancyMessages from './locales/messages/english/vacancy.json'

import russianCommonMessages from './locales/messages/russian/common.json'
import russianVacancyMessages from './locales/messages/russian/vacancy.json'

export const availableLanguages = [
  {
    code: 'ru',
    label: 'Русский',
  },
  {
    code: 'en',
    label: 'English',
  },
] as const

export type Language = (typeof availableLanguages)[number]['code']

const russianMessages = {
  common: russianCommonMessages,
  vacancy: russianVacancyMessages,
}

export type Messages = typeof russianMessages

const englishMessages = {
  common: englishCommonMessages,
  vacancy: englishVacancyMessages,
} satisfies Messages

export const resources = {
  ru: russianMessages,
  en: englishMessages,
} satisfies Record<Language, Messages>
