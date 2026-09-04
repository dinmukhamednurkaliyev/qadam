<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { isVacancyList, type Vacancy } from '@/features/vacancies/vacancy'

const vacancies = ref<Vacancy[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/vacancies')

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data: unknown = await response.json()

    if (!isVacancyList(data)) {
      throw new Error('Invalid vacancies response')
    }

    vacancies.value = data
  } catch (error) {
    console.error('Failed to load vacancies:', error)

    errorMessage.value = 'Failed to load vacancies'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading">Loading vacancies...</div>

  <div v-else-if="errorMessage">
    {{ errorMessage }}
  </div>

  <div v-else-if="vacancies.length === 0">No vacancies found</div>

  <pre v-else>{{ vacancies }}</pre>
</template>
