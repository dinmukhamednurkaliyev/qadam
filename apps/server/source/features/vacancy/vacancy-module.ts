import { createVacancyRoute } from './vacancy-route'
import type { VacancyService } from './vacancy-service'

export type VacancyModuleDependencies = {
  vacancyService: VacancyService
}

export function createVacancyModule(dependencies: VacancyModuleDependencies) {
  return createVacancyRoute(dependencies.vacancyService)
}
