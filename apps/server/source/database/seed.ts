import { database } from '@/database/database'
import { organizationTable } from '@/database/schemas/organization-schema'
import { jobsTable } from '@/database/schemas/job-schema'
import { locationsTable } from '@/database/schemas/location-schema'
import { regionsTable } from '@/database/schemas/region-schema'

const [region] = await database
  .insert(regionsTable)
  .values({
    name: 'Almaty',
    code: 'almaty',
  })
  .returning()

const [location] = await database
  .insert(locationsTable)
  .values({
    regionId: region.id,
    name: 'Almaty',
  })
  .returning()

const [organization] = await database
  .insert(organizationTable)
  .values({
    name: 'Qadam',
    description: 'A job platform for candidates and employers',
    website: 'https://example.com',
  })
  .returning()

await database.insert(jobsTable).values({
  organizationId: organization.id,
  locationId: location.id,
  title: 'Frontend Developer',
  description: 'Vue developer position',
})

console.log('Database seeded')
