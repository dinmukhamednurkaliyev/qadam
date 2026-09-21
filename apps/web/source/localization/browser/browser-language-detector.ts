import { locales, type Locale } from '@/localization/locales/locales'

const supportedLocales = Object.values(locales)

/**
 * Selects the first supported language in browser preference order.
 * Returns undefined when none match, leaving the fallback choice to the caller.
 *
 * @param browserLanguages Language tags from navigator.languages, most preferred first.
 */
export const detectBrowserLocale = (browserLanguages: readonly string[]): Locale | undefined => {
  for (const browserLanguage of browserLanguages) {
    // Messages are language-wide: regional variants such as ru-KZ share the ru dictionary.
    const languageCode = browserLanguage.trim().split('-', 1)[0]?.toLowerCase()
    const locale = supportedLocales.find((supportedLocale) => supportedLocale === languageCode)

    if (locale !== undefined) {
      return locale
    }
  }

  return undefined
}
