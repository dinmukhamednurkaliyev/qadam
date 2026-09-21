import { createApp } from 'vue'

import '@/appearance/appearance.css'
import App from '@/app.vue'
import { createLocalization } from '@/localization/localization'

const browserLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language]
const localization = createLocalization(browserLanguages)

document.documentElement.lang = localization.global.locale.value

createApp(App).use(localization).mount('#app')
