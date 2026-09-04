import { Hono } from 'hono'
import { eq } from 'drizzle-orm'

import { database } from '@/database/database'
import { organizationTable } from '@/database/schemas/organization-schema'
import { jobsTable } from '@/database/schemas/job-schema'
import { locationsTable } from '@/database/schemas/location-schema'

export const jobsRoute = new Hono()

jobsRoute.get('/:id', async (context) => {
  const id = context.req.param('id')

  const [job] = await database
    .select({
      id: jobsTable.id,
      title: jobsTable.title,
      description: jobsTable.description,
      createdAt: jobsTable.createdAt,
      updatedAt: jobsTable.updatedAt,

      organization: {
        id: organizationTable.id,
        name: organizationTable.name,
        website: organizationTable.website,
      },

      location: {
        id: locationsTable.id,
        name: locationsTable.name,
      },
    })
    .from(jobsTable)
    .innerJoin(organizationTable, eq(jobsTable.organizationId, organizationTable.id))
    .leftJoin(locationsTable, eq(jobsTable.locationId, locationsTable.id))
    .where(eq(jobsTable.id, id))

  if (!job) {
    return context.json({ message: 'Job not found' }, 404)
  }

  return context.json(job)
})
