import { createI18n } from 'vue-i18n'

import { messages, type Locale } from './locales/messages/resources'

const defaultLocale: Locale = 'english'

export const localization = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages,
})
