<script setup lang="ts">
import type { Job } from "~/types/job";

defineProps<{
  job: Job;
}>();
</script>

<template>
  <article class="job-details">
    <header class="job-details-header">
      <div class="job-details-heading">
        <h2>{{ job.title }}</h2>

        <p class="job-details-company">
          {{ job.company.name }}
        </p>
      </div>

      <button class="job-details-bookmark" type="button" aria-label="Save job">
        <Icon name="lucide:bookmark" />
      </button>
    </header>

    <div class="job-details-meta">
      <span class="job-details-location">
        <Icon name="lucide:map-pin" />

        {{ job.location.city }}, {{ job.location.country }}
      </span>
    </div>

    <p v-if="job.description" class="job-details-description">
      {{ job.description }}
    </p>
  </article>
</template>

<style scoped>
.job-details {
  display: grid;
  gap: var(--space-6);
}

.job-details-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-6);
}

.job-details-heading {
  display: grid;
  gap: var(--space-1);
  min-width: 0;
}

.job-details-company {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.job-details-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.job-details-location {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.job-details-location svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.job-details-description {
  color: var(--color-text-secondary);
}

.job-details-bookmark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.job-details-bookmark:hover {
  color: var(--color-primary);
  background: var(--color-surface-active);
}
</style>
