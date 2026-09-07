import { database } from '@/database/database'
import { organizationMemberTable } from '@/database/schemas/organization-member-schema'
import { organizationTable } from '@/database/schemas/organization-schema'
import { vacancyTable } from '@/database/schemas/vacancy-schema'
import { locationTable } from '@/database/schemas/location-schema'
import { regionsTable } from '@/database/schemas/region-schema'
import { usersTable } from '@/database/schemas/user-schema'

const seedIds = {
  user: '10000000-0000-4000-8000-000000000001',
  region: '10000000-0000-4000-8000-000000000002',
  location: '10000000-0000-4000-8000-000000000003',
  organization: '10000000-0000-4000-8000-000000000004',
  membership: '10000000-0000-4000-8000-000000000005',
  vacancy: '10000000-0000-4000-8000-000000000006',
} as const

await database
  .insert(usersTable)
  .values({
    id: seedIds.user,
    email: 'owner@qadam.local',
    passwordHash: 'development-only-not-a-real-password-hash',
    emailVerifiedAt: new Date().toISOString(),
  })
  .onConflictDoUpdate({
    target: usersTable.id,
    set: {
      email: 'owner@qadam.local',
      emailVerifiedAt: new Date().toISOString(),
    },
  })

const [region] = await database
  .insert(regionsTable)
  .values({
    id: seedIds.region,
    countryCode: 'KZ',
    name: 'Almaty',
    code: 'almaty',
  })
  .onConflictDoUpdate({
    target: regionsTable.id,
    set: {
      countryCode: 'KZ',
      name: 'Almaty',
      code: 'almaty',
    },
  })
  .returning()

const [location] = await database
  .insert(locationTable)
  .values({
    id: seedIds.location,
    regionId: region.id,
    name: 'Almaty',
  })
  .onConflictDoUpdate({
    target: locationTable.id,
    set: {
      regionId: region.id,
      name: 'Almaty',
    },
  })
  .returning()

const [organization] = await database
  .insert(organizationTable)
  .values({
    id: seedIds.organization,
    createdByUserId: seedIds.user,
    name: 'Qadam',
    slug: 'qadam',
    legalName: 'Qadam Development Organization',
    registrationCountryCode: 'KZ',
    registrationNumber: '000000000000',
    contactEmail: 'organization@qadam.local',
    description: 'A job platform for candidates and employers',
    website: 'https://example.com',
    status: 'verified',
    verifiedAt: new Date().toISOString(),
  })
  .onConflictDoUpdate({
    target: organizationTable.id,
    set: {
      name: 'Qadam',
      slug: 'qadam',
      legalName: 'Qadam Development Organization',
      registrationCountryCode: 'KZ',
      registrationNumber: '000000000000',
      contactEmail: 'organization@qadam.local',
      description: 'A job platform for candidates and employers',
      website: 'https://example.com',
      status: 'verified',
      verifiedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
  .returning()

await database
  .insert(organizationMemberTable)
  .values({
    id: seedIds.membership,
    organizationId: organization.id,
    userId: seedIds.user,
    role: 'owner',
  })
  .onConflictDoNothing({ target: organizationMemberTable.id })

await database
  .insert(vacancyTable)
  .values({
    id: seedIds.vacancy,
    organizationId: organization.id,
    createdByUserId: seedIds.user,
    locationId: location.id,
    title: 'Frontend Developer',
    description: 'Vue developer position',
    status: 'published',
    employmentType: 'full_time',
    workplaceType: 'hybrid',
    salaryFrom: 500_000,
    salaryTo: 900_000,
    salaryCurrency: 'KZT',
    publishedAt: new Date().toISOString(),
  })
  .onConflictDoUpdate({
    target: vacancyTable.id,
    set: {
      title: 'Frontend Developer',
      description: 'Vue developer position',
      status: 'published',
      employmentType: 'full_time',
      workplaceType: 'hybrid',
      salaryFrom: 500_000,
      salaryTo: 900_000,
      salaryCurrency: 'KZT',
      updatedAt: new Date().toISOString(),
    },
  })

console.log('Database seeded')
