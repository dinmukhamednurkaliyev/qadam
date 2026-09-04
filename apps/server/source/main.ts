import { cors } from 'hono/cors'
import { Hono } from 'hono'

import { organizationsRoute } from '@/features/organizations/organizations-route'
import { vacanciesRoute } from '@/features/vacancies/vacancies-route'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.route('/vacancies', vacanciesRoute)
app.route('/organizations', organizationsRoute)

export default app
