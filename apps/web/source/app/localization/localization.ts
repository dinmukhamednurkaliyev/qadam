import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

import englishCommonMessages from './locales/messages/english/common.json'
import englishVacancyMessages from './locales/messages/english/vacancy.json'
import russianCommonMessages from './locales/messages/russian/common.json'
import russianVacancyMessages from './locales/messages/russian/vacancy.json'

const englishMessages = {
  common: englishCommonMessages,
  vacancy: englishVacancyMessages,
}

const russianMessages = {
  common: russianCommonMessages,
  vacancy: russianVacancyMessages,
}

export type Language = 'ru' | 'en'

const languageStorageKey = 'qadam.language'

export const availableLanguages = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
] satisfies Array<{ value: Language; label: string }>

function isLanguage(value: string | null): value is Language {
  return value === 'ru' || value === 'en'
}

function readLanguage(): Language {
  try {
    const savedLanguage = localStorage.getItem(languageStorageKey)

    if (isLanguage(savedLanguage)) {
      return savedLanguage
    }
  } catch {
    // Browser storage can be unavailable; localization still works in memory.
  }

  return 'ru'
}

export const localization = createI18n<[typeof englishMessages], Language, false>({
  legacy: false,
  locale: readLanguage(),
  fallbackLocale: 'en',
  messages: {
    ru: russianMessages,
    en: englishMessages,
  },
})

watch(
  localization.global.locale,
  (language: Language): void => {
    document.documentElement.lang = language

    try {
      localStorage.setItem(languageStorageKey, language)
    } catch {
      // A blocked storage must not prevent changing the interface language.
    }
  },
  { immediate: true, flush: 'sync' },
)
