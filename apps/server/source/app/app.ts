import { cors } from 'hono/cors'
import { Hono } from 'hono'

import { appConfiguration } from '@/app/app-configuration'
import { createAppModules } from '@/app/app-modules'

const app = new Hono()
const appModules = createAppModules()

app.use(
  '*',
  cors({
    credentials: true,
    origin: appConfiguration.webOrigin,
  }),
)

app.route('/authentication', appModules.authentication)
app.route('/organizations', appModules.organization)
app.route('/vacancies', appModules.vacancy)

export default {
  port: appConfiguration.port,
  fetch: app.fetch,
}
