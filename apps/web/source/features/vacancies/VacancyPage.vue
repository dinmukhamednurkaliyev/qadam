<script setup lang="ts">
import { onMounted, ref } from 'vue'

const vacancies = ref<unknown[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/vacancies')

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Invalid vacancies response')
    }

    vacancies.value = data
  } catch (error) {
    console.error(error)

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
