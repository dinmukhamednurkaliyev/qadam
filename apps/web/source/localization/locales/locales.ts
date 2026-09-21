/** Maps readable language names to the standard tags used by Vue I18n, Intl and HTML. */
export const locales = {
  english: 'en',
  russian: 'ru',
  kazakh: 'kk',
} as const

/** Restricts application locales to the codes declared in the supported language map. */
export type Locale = (typeof locales)[keyof typeof locales]

/** Uses English when no preferred language matches or a translation is unavailable. */
export const fallbackLocale: Locale = locales.english
