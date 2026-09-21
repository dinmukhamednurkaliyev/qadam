import { createI18n } from 'vue-i18n'

import { detectBrowserLocale } from '@/localization/browser/browser-language-detector'
import { fallbackLocale } from '@/localization/locales/locales'
import { messages } from '@/localization/locales/messages/resources'

export const createLocalization = (browserLanguages: readonly string[] = []) => {
  const initialLocale = detectBrowserLocale(browserLanguages) ?? fallbackLocale

  return createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale,
    messages,
  })
}
