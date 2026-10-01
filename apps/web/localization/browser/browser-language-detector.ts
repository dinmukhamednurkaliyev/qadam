import { locales, type Locale } from '@/localization/locales/locales'

const supportedLocales = Object.values(locales)

export const detectBrowserLocale = (browserLanguages: readonly string[]): Locale | undefined => {
  for (const browserLanguage of browserLanguages) {
    const languageCode = browserLanguage.trim().split('-', 1)[0]?.toLowerCase()
    const locale = supportedLocales.find((supportedLocale) => supportedLocale === languageCode)

    if (locale !== undefined) {
      return locale
    }
  }

  return undefined
}
