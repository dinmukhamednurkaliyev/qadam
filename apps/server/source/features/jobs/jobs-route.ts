import { Hono } from 'hono'

import { database } from '@/database/database'
import { jobsTable } from '@/database/schemas/job-schema'

export const jobsRoute = new Hono()

jobsRoute.get('/', async (context) => {
  const jobs = await database.select().from(jobsTable)

  return context.json(jobs)
})
