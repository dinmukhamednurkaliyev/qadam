import { vacancyFiltersSchema, vacancyParametersSchema } from '@qadam/shared/vacancy'
import { errorResponseSchema } from '@qadam/shared/http'
import { Hono } from 'hono'

import type { VacancyService } from './vacancy-service'

export function createVacancyRoute(vacancyService: VacancyService): Hono {
  const vacancyRoute = new Hono()

  vacancyRoute.onError((error, context) => {
    console.error('Vacancies request failed:', error)
    return context.json(
      errorResponseSchema.parse({
        code: 'INTERNAL_ERROR',
        message: 'Unable to process vacancies request',
      }),
      500,
    )
  })

  vacancyRoute.get('/', async (context) => {
    const parsed = vacancyFiltersSchema.safeParse(context.req.query())
    if (!parsed.success) {
      return context.json(
        errorResponseSchema.parse({
          code: 'VALIDATION_ERROR',
          message: 'Invalid vacancy filters',
          issues: parsed.error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        }),
        400,
      )
    }

    const vacancies = await vacancyService.getVacancies(parsed.data)

    return context.json(vacancies)
  })

  vacancyRoute.get('/:id', async (context) => {
    const parsed = vacancyParametersSchema.safeParse(context.req.param())
    if (!parsed.success) {
      return context.json(
        errorResponseSchema.parse({
          code: 'VALIDATION_ERROR',
          message: 'Invalid vacancy ID',
        }),
        400,
      )
    }

    const vacancy = await vacancyService.getVacancy(parsed.data.id)

    if (!vacancy) {
      return context.json(
        errorResponseSchema.parse({
          code: 'NOT_FOUND',
          message: 'Vacancy not found',
        }),
        404,
      )
    }

    return context.json(vacancy)
  })

  return vacancyRoute
}
