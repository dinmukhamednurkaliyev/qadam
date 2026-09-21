import { createApp } from 'vue'

import '@/appearance/appearance.css'
import App from '@/app.vue'
import { createLocalization } from '@/localization/localization'

// Resolve preferences once at startup; the browser supplies them in priority order.
const browserLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language]
const localization = createLocalization(browserLanguages)

// Set the initial document language before mounting so assistive technology can use it.
document.documentElement.lang = localization.global.locale.value

createApp(App).use(localization).mount('#app')
