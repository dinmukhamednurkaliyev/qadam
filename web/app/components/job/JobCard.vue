<script setup lang="ts">
import type { Job } from "~/types/job";

defineProps<{
  job: Job;
}>();
</script>

<template>
  <article class="job-card">
    <div class="job-card-content">
      <div class="job-card__header">
        <h2>{{ job.title }}</h2>

        <p class="job-card-company">
          {{ job.company.name }}
        </p>
      </div>

      <p class="job-card-location">{{ job.location.city }}, {{ job.location.country }}</p>

      <p v-if="job.description" class="job-card-description">
        {{ job.description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.job-card {
  position: relative;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    border-color var(--duration-normal) var(--ease-standard),
    background-color var(--duration-normal) var(--ease-standard);
}

.job-card::before {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 0.25rem;
  background: var(--color-primary);
  content: "";
}

.job-card:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-strong);
}

.job-card-content {
  display: grid;
  gap: var(--space-4);
}

.job-card__header {
  display: grid;
  gap: var(--space-1);
}

.job-card-company,
.job-card-location,
.job-card-description {
  margin: 0;
}

.job-card-company {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.job-card-location {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.job-card-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
}
</style>
