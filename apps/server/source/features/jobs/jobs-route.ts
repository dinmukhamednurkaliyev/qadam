import { Hono } from 'hono'
import { eq } from 'drizzle-orm'

import { database } from '@/database/database'
import { companiesTable } from '@/database/schemas/company-schema'
import { jobsTable } from '@/database/schemas/job-schema'
import { locationsTable } from '@/database/schemas/location-schema'

export const jobsRoute = new Hono()

jobsRoute.get('/', async (context) => {
  const jobs = await database
    .select({
      id: jobsTable.id,
      title: jobsTable.title,
      description: jobsTable.description,
      createdAt: jobsTable.createdAt,
      updatedAt: jobsTable.updatedAt,

      company: {
        id: companiesTable.id,
        name: companiesTable.name,
        website: companiesTable.website,
      },

      location: {
        id: locationsTable.id,
        name: locationsTable.name,
      },
    })
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.companyId, companiesTable.id))
    .leftJoin(locationsTable, eq(jobsTable.locationId, locationsTable.id))

  return context.json(jobs)
})
