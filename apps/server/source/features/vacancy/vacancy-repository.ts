import type { VacancyDetails, VacancyFilters, VacancyListItem } from '@qadam/shared/vacancy'

export interface VacancyRepository {
  findPublicVacancies(filters: VacancyFilters): Promise<VacancyListItem[]>
  findPublicVacancyById(vacancyId: string): Promise<VacancyDetails | undefined>
}
