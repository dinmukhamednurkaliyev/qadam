<script setup lang="ts">
import type { Job } from "~/types/job";

defineProps<{
  jobs: Job[];
}>();
</script>

<template>
  <div class="job-list">
    <JobCard v-for="job in jobs" :key="job.id" :job="job" />
  </div>
</template>

<style scoped>
.job-list {
  display: grid;
  gap: var(--space-4);
}
</style>
