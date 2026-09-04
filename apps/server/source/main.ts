import { Hono } from 'hono'

import { vacanciesRoute } from '@/features/vacancies/vacancies-route'
import { organizationsRoute } from '@/features/organizations/organizations-route'

const app = new Hono()

app.route('/vacancies', vacanciesRoute)
app.route('/organizations', organizationsRoute)

export default app
