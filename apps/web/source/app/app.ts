import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/app/App.vue'
import router from '@/app/app-router'
import { localization } from '@/app/localization/localization'

const app = createApp(App)

app.use(createPinia())
app.use(localization)
app.use(router)

app.mount('#app')
