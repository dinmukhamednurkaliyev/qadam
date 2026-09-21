import { createI18n } from 'vue-i18n'

import { detectBrowserLocale } from '@/localization/browser/browser-language-detector'
import { fallbackLocale } from '@/localization/locales/locales'
import { messages } from '@/localization/locales/messages/resources'

/**
 * Creates an application localization instance with its own active locale.
 * Empty or unsupported preferences use fallbackLocale; missing translations do too.
 * Browser access belongs to the caller, so importing this module does not choose a language.
 */
export const createLocalization = (browserLanguages: readonly string[] = []) => {
  const initialLocale = detectBrowserLocale(browserLanguages) ?? fallbackLocale

  return createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale,
    messages,
  })
}
