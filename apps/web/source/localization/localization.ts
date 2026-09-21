import { createI18n } from 'vue-i18n'

import { detectBrowserLocale } from './browser/browser-language-detector'
import { messages, type Locale } from './locales/messages/resources'

const fallbackLocale: Locale = 'english'
const initialLocale = detectBrowserLocale() ?? fallbackLocale

export const localization = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale,
  messages,
})
