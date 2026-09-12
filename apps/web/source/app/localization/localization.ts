import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

import { detectBrowserLanguage } from './language-detector'
import { availableLanguages, resources, type Language, type Messages } from './resources'

const defaultLanguage: Language = 'ru'
const fallbackLanguage: Language = 'en'
const languageStorageKey = 'qadam.language'

function isLanguage(value: string | null): value is Language {
  return availableLanguages.some(({ code }) => code === value)
}

function readLanguage(): Language {
  try {
    const storedLanguage = localStorage.getItem(languageStorageKey)

    if (isLanguage(storedLanguage)) {
      return storedLanguage
    }
  } catch {}

  const browserLanguage = detectBrowserLanguage()

  if (browserLanguage) {
    return browserLanguage
  }

  return defaultLanguage
}

function syncLanguage(language: Language): void {
  document.documentElement.lang = language

  try {
    localStorage.setItem(languageStorageKey, language)
  } catch {}
}

export const localization = createI18n<[Messages], Language, false>({
  legacy: false,
  locale: readLanguage(),
  fallbackLocale: fallbackLanguage,
  messages: resources,
})

export function initializeLocalization(): void {
  watch(localization.global.locale, syncLanguage, {
    immediate: true,
    flush: 'sync',
  })
}
