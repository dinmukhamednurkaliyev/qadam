import { database } from '@/database/database'
import { companiesTable } from '@/database/schemas/company-schema'
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

const [company] = await database
  .insert(companiesTable)
  .values({
    name: 'Qadam',
    description: 'A job platform for candidates and employers',
    website: 'https://example.com',
  })
  .returning()

await database.insert(jobsTable).values({
  companyId: company.id,
  locationId: location.id,
  title: 'Frontend Developer',
  description: 'Vue developer position',
})

console.log('Database seeded')
