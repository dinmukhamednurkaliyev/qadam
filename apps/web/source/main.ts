import '@/appearance/appearance.css'
import { readAppConfiguration } from '@/app-configuration'
import { createApp } from '@/app'
import { createLocalization } from '@/localization/localization'
import { createAppRouter } from '@/router/router'

const browserLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language]

const configuration = readAppConfiguration(browserLanguages)
const localization = createLocalization(configuration.locale)
const router = createAppRouter()

const app = createApp({
  localization,
  router,
})

document.documentElement.lang = localization.global.locale.value

app.mount('#app')
