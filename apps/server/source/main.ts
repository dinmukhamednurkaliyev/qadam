import { Hono } from 'hono'

import { jobsRoute } from '@/features/jobs/jobs-route'

const app = new Hono()

app.route('/jobs', jobsRoute)

export default app
