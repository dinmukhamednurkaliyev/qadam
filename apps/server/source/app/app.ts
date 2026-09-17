import { cors } from 'hono/cors'
import { Hono } from 'hono'

import { appConfiguration } from '@/app/app-configuration'
import { currentUserRoute } from '@/features/authentication/current-user-route'
import { signInRoute } from '@/features/authentication/sign-in-route'
import { signOutRoute } from '@/features/authentication/sign-out-route'
import { signUpRoute } from '@/features/authentication/sign-up-route'
import { organizationsRoute } from '@/features/organization/organization-route'
import { vacanciesRoute } from '@/features/vacancy/vacancy-route'

const app = new Hono()

app.use(
  '*',
  cors({
    credentials: true,
    origin: appConfiguration.webOrigin,
  }),
)

app.route('/vacancies', vacanciesRoute)
app.route('/authentication/current-user', currentUserRoute)
app.route('/authentication/sign-in', signInRoute)
app.route('/authentication/sign-out', signOutRoute)
app.route('/authentication/sign-up', signUpRoute)
app.route('/organizations', organizationsRoute)

export default {
  port: appConfiguration.port,
  fetch: app.fetch,
}
