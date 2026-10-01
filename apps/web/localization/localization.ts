import { createI18n } from 'vue-i18n'

import { fallbackLocale, type Locale } from '@/localization/locales/locales'
import { messages } from '@/localization/locales/messages/resources'

export const createLocalization = (locale: Locale) => {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale,
    messages,
  })
}
