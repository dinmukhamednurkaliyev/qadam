import { createApp } from 'vue'

import './appearance/appearance.css'
import App from './app.vue'
import { localization } from './localization/localization.js'

createApp(App).use(localization).mount('#app')
