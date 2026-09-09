import { cors } from 'hono/cors'
import { Hono } from 'hono'

import { appConfiguration } from '@/app/app-configuration'
import { organizationsRoute } from '@/features/organization/organization-route'
import { vacanciesRoute } from '@/features/vacancy/vacancy-route'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: appConfiguration.webOrigin,
  }),
)

app.route('/vacancies', vacanciesRoute)
app.route('/organizations', organizationsRoute)

export default {
  port: appConfiguration.port,
  fetch: app.fetch,
}
