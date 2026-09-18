import { organizationPathParametersSchema } from '@qadam/shared/organization'
import { errorResponseSchema } from '@qadam/shared/http'
import { Hono } from 'hono'

import type { OrganizationService } from './organization-service'

export function createOrganizationRoute(organizationService: OrganizationService): Hono {
  const organizationRoute = new Hono()

  organizationRoute.onError((error, context) => {
    console.error('Organizations request failed:', error)
    return context.json(
      errorResponseSchema.parse({
        code: 'INTERNAL_ERROR',
        message: 'Unable to process organizations request',
      }),
      500,
    )
  })

  organizationRoute.get('/', async (context) => {
    const organizations = await organizationService.getOrganizations()

    return context.json(organizations)
  })

  organizationRoute.get('/:id', async (context) => {
    const validation = organizationPathParametersSchema.safeParse(context.req.param())

    if (!validation.success) {
      return context.json(
        errorResponseSchema.parse({
          code: 'VALIDATION_ERROR',
          message: 'Invalid organization ID',
        }),
        400,
      )
    }

    const organization = await organizationService.getOrganization(validation.data.id)

    if (!organization) {
      return context.json(
        errorResponseSchema.parse({
          code: 'NOT_FOUND',
          message: 'Organization not found',
        }),
        404,
      )
    }

    return context.json(organization)
  })

  return organizationRoute
}
