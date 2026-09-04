import { eq } from 'drizzle-orm'
import { Hono } from 'hono'

import { database } from '@/database/database'
import { organizationTable } from '@/database/schemas/organization-schema'

export const organizationsRoute = new Hono()

organizationsRoute.get('/', async (context) => {
  const organizations = await database.select().from(organizationTable)

  return context.json(organizations)
})

organizationsRoute.get('/:id', async (context) => {
  const id = context.req.param('id')

  const [organization] = await database
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.id, id))

  if (!organization) {
    return context.json({ message: 'Organization not found' }, 404)
  }

  return context.json(organization)
})
