<script setup lang="ts">
import type { Job } from "~/types/job";

defineProps<{
  job: Job;
}>();
</script>

<template>
  <article class="job-details">
    <header class="job-details-header">
      <h2>{{ job.title }}</h2>

      <p class="job-details-company">
        {{ job.company.name }}
      </p>
    </header>

    <div class="job-details-meta">
      <p class="job-details-location">{{ job.location.city }}, {{ job.location.country }}</p>
    </div>

    <p v-if="job.content" class="job-details-content">
      {{ job.content }}
    </p>
  </article>
</template>

<style scoped>
.job-details {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.job-details-header {
  display: grid;
  gap: var(--space-1);
}

.job-details-company {
  color: var(--color-primary);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
}

.job-details-location {
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}

.job-details-content {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  white-space: pre-line;
}
</style>
