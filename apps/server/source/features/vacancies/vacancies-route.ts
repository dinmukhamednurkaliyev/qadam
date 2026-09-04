import { eq } from 'drizzle-orm'
import { Hono } from 'hono'

import { database } from '@/database/database'
import { locationTable } from '@/database/schemas/location-schema'
import { organizationTable } from '@/database/schemas/organization-schema'
import { vacancyTable } from '@/database/schemas/vacancy-schema'

export const vacanciesRoute = new Hono()

vacanciesRoute.get('/', async (context) => {
  const vacancies = await database
    .select({
      id: vacancyTable.id,
      title: vacancyTable.title,
      description: vacancyTable.description,
      createdAt: vacancyTable.createdAt,
      updatedAt: vacancyTable.updatedAt,

      organization: {
        id: organizationTable.id,
        name: organizationTable.name,
        website: organizationTable.website,
      },

      location: {
        id: locationTable.id,
        name: locationTable.name,
      },
    })
    .from(vacancyTable)
    .innerJoin(organizationTable, eq(vacancyTable.organizationId, organizationTable.id))
    .leftJoin(locationTable, eq(vacancyTable.locationId, locationTable.id))

  return context.json(vacancies)
})

vacanciesRoute.get('/:id', async (context) => {
  const id = context.req.param('id')

  const [vacancy] = await database
    .select({
      id: vacancyTable.id,
      title: vacancyTable.title,
      description: vacancyTable.description,
      createdAt: vacancyTable.createdAt,
      updatedAt: vacancyTable.updatedAt,

      organization: {
        id: organizationTable.id,
        name: organizationTable.name,
        website: organizationTable.website,
      },

      location: {
        id: locationTable.id,
        name: locationTable.name,
      },
    })
    .from(vacancyTable)
    .innerJoin(organizationTable, eq(vacancyTable.organizationId, organizationTable.id))
    .leftJoin(locationTable, eq(vacancyTable.locationId, locationTable.id))
    .where(eq(vacancyTable.id, id))

  if (!vacancy) {
    return context.json({ message: 'Vacancy not found' }, 404)
  }

  return context.json(vacancy)
})
