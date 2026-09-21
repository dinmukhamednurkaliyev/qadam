import { createApp as createVueApp } from 'vue'

import App from '@/app.vue'
import type { createLocalization } from '@/localization/localization'

export interface AppDependencies {
  readonly localization: ReturnType<typeof createLocalization>
}

export const createApp = ({ localization }: AppDependencies) => {
  const app = createVueApp(App)

  app.use(localization)

  return app
}
