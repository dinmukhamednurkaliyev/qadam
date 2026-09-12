import { availableLanguages, type Language } from './resources'

export function detectBrowserLanguage(): Language | undefined {
  if (typeof navigator === 'undefined') {
    return undefined
  }

  const browserLanguages =
    navigator.languages.length > 0 ? navigator.languages : [navigator.language]

  for (const browserLanguage of browserLanguages) {
    const languageCode = browserLanguage.toLowerCase().split('-')[0]

    const language = availableLanguages.find(({ code }) => code === languageCode)

    if (language) {
      return language.code
    }
  }

  return undefined
}
