export const locales = {
  english: 'en',
  russian: 'ru',
  kazakh: 'kk',
} as const

export type Locale = (typeof locales)[keyof typeof locales]

export const fallbackLocale: Locale = locales.english
