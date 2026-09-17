import {
  vacancyDetailsSchema,
  vacancyListResponseSchema,
  type VacancyFilters,
  type VacancyDetails,
  type VacancyListResponse,
} from '@qadam/shared/vacancy'

import type { VacancyRepository } from './vacancy-repository'

export interface VacancyService {
  getVacancies(filters: VacancyFilters): Promise<VacancyListResponse>
  getVacancy(vacancyId: string): Promise<VacancyDetails | undefined>
}

export function createVacancyService(vacancyRepository: VacancyRepository): VacancyService {
  return {
    async getVacancies(filters) {
      return vacancyListResponseSchema.parse(await vacancyRepository.findPublicVacancies(filters))
    },

    async getVacancy(vacancyId) {
      const vacancy = await vacancyRepository.findPublicVacancyById(vacancyId)

      return vacancy === undefined ? undefined : vacancyDetailsSchema.parse(vacancy)
    },
  }
}
