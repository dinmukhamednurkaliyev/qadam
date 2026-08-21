<script setup lang="ts">
import type { Job } from "~/types/job";

defineProps<{
  jobs: Job[];
}>();

const emit = defineEmits<{
  select: [jobId: string];
}>();
</script>

<template>
  <div class="job-list">
    <JobCard v-for="job in jobs" :key="job.id" :job="job" @select="emit('select', $event)" />
  </div>
</template>

<style scoped>
.job-list {
  display: grid;
  gap: var(--space-4);
}
</style>
