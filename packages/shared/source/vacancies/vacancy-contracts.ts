import { z } from 'zod'

export const employmentTypeSchema = z.enum([
  'full_time',
  'part_time',
  'contract',
  'internship',
  'temporary',
])
export const workplaceTypeSchema = z.enum(['onsite', 'hybrid', 'remote'])
export const vacancyParametersSchema = z.object({ id: z.uuid() })

export const vacancyFiltersSchema = z.strictObject({
  search: z.string().trim().min(1).max(200).optional(),
  organizationId: z.uuid().optional(),
  locationId: z.uuid().optional(),
  employmentType: employmentTypeSchema.optional(),
  workplaceType: workplaceTypeSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).max(100000).default(0),
})

export const vacancyListItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  organization: z.object({
    id: z.uuid(),
    name: z.string(),
    website: z.string().nullable(),
  }),
  location: z.object({ id: z.uuid(), name: z.string() }).nullable(),
  status: z.enum(['published', 'closed']),
  employmentType: employmentTypeSchema.nullable(),
  workplaceType: workplaceTypeSchema.nullable(),
  salaryFrom: z.number().int().nonnegative().nullable(),
  salaryTo: z.number().int().nonnegative().nullable(),
  salaryCurrency: z.string().nullable(),
  publishedAt: z.iso.datetime().nullable(),
  closedAt: z.iso.datetime().nullable(),
})

export const vacancyDetailsSchema = vacancyListItemSchema.extend({})
export const vacancyListResponseSchema = z.array(vacancyListItemSchema)

export type VacancyFilters = z.infer<typeof vacancyFiltersSchema>
export type VacancyListItem = z.infer<typeof vacancyListItemSchema>
export type VacancyDetails = z.infer<typeof vacancyDetailsSchema>
export type VacancyListResponse = z.infer<typeof vacancyListResponseSchema>
