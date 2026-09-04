export type Vacancy = {
  id: string
  title: string
  description: string | null
  createdAt: string
  updatedAt: string

  organization: {
    id: string
    name: string
    website: string | null
  }

  location: {
    id: string
    name: string
  } | null
}

export function isVacancy(value: unknown): value is Vacancy {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const vacancy = value as Record<string, unknown>

  if (typeof vacancy.id !== 'string') {
    return false
  }

  if (typeof vacancy.title !== 'string') {
    return false
  }

  if (vacancy.description !== null && typeof vacancy.description !== 'string') {
    return false
  }

  if (typeof vacancy.createdAt !== 'string') {
    return false
  }

  if (typeof vacancy.updatedAt !== 'string') {
    return false
  }

  if (typeof vacancy.organization !== 'object' || vacancy.organization === null) {
    return false
  }

  const organization = vacancy.organization as Record<string, unknown>

  if (typeof organization.id !== 'string') {
    return false
  }

  if (typeof organization.name !== 'string') {
    return false
  }

  if (organization.website !== null && typeof organization.website !== 'string') {
    return false
  }

  if (vacancy.location !== null) {
    if (typeof vacancy.location !== 'object' || vacancy.location === null) {
      return false
    }

    const location = vacancy.location as Record<string, unknown>

    if (typeof location.id !== 'string') {
      return false
    }

    if (typeof location.name !== 'string') {
      return false
    }
  }

  return true
}

export function isVacancyList(value: unknown): value is Vacancy[] {
  return Array.isArray(value) && value.every(isVacancy)
}
