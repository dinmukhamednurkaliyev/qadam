import { createApp as createVueApp } from 'vue'
import type { Router } from 'vue-router'

import App from '@/app.vue'

import type { createLocalization } from '@/localization/localization'

export interface AppDependencies {
  readonly localization: ReturnType<typeof createLocalization>
  readonly router: Router
}

export const createApp = ({ localization, router }: AppDependencies) => {
  const app = createVueApp(App)

  app.use(localization)
  app.use(router)

  return app
}
