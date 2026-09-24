import { detectBrowserLocale } from '@/localization/browser/browser-language-detector'
import { fallbackLocale, type Locale } from '@/localization/locales/locales'

export interface AppConfiguration {
  readonly locale: Locale
}

export const readAppConfiguration = (browserLanguages: readonly string[]): AppConfiguration => {
  const locale = detectBrowserLocale(browserLanguages) ?? fallbackLocale

  return { locale }
}
