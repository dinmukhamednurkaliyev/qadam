import type { Locale } from '../locales/messages/resources'

const localeByLanguageCode: Readonly<Record<string, Locale>> = {
  en: 'english',
  kk: 'kazakh',
  ru: 'russian',
}

const getLanguageCode = (language: string): string => language.split('-', 1)[0]?.toLowerCase() ?? ''

export const detectBrowserLocale = (): Locale | undefined => {
  if (typeof navigator === 'undefined') {
    return undefined
  }

  const browserLanguages =
    navigator.languages.length > 0 ? navigator.languages : [navigator.language]

  for (const browserLanguage of browserLanguages) {
    const locale = localeByLanguageCode[getLanguageCode(browserLanguage)]

    if (locale) {
      return locale
    }
  }

  return undefined
}
