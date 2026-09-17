import { z } from 'zod'

export const organizationStatusSchema = z.enum([
  'draft',
  'pending',
  'verified',
  'rejected',
  'suspended',
])

export const organizationPathParametersSchema = z.strictObject({
  id: z.uuid(),
})

export const organizationListItemSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  legalName: z.string(),
  registrationCountryCode: z.string().length(2),
  registrationNumber: z.string(),
  contactEmail: z.email().max(255),
  website: z.url().max(2048).nullable(),
  description: z.string(),
  status: organizationStatusSchema,
  verifiedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const organizationDetailsSchema = organizationListItemSchema
export const organizationListResponseSchema = z.array(organizationListItemSchema)

export type OrganizationListItem = z.infer<typeof organizationListItemSchema>
export type OrganizationDetails = z.infer<typeof organizationDetailsSchema>
export type OrganizationListResponse = z.infer<typeof organizationListResponseSchema>
