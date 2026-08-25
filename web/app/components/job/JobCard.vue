<script setup lang="ts">
import type { JobEntity } from "~/types/jobs/job-entity";

defineProps<{
  job: JobEntity;
  selected: boolean;
}>();

const emit = defineEmits<{
  select: [jobId: string];
}>();
</script>

<template>
  <article
    class="job-card"
    :class="{ 'job-card-selected': selected }"
    @click="emit('select', job.id)"
  >
    <div class="job-card-content">
      <header class="job-card-header">
        <div class="job-card-heading">
          <h2>{{ job.title }}</h2>

          <p class="job-card-company">
            {{ job.company.name }}
          </p>
        </div>

        <button class="job-card-bookmark" type="button" aria-label="Save job" @click.stop>
          <Icon name="lucide:bookmark" />
        </button>
      </header>

      <div class="job-card-meta">
        <span class="job-card-location">
          <Icon name="lucide:map-pin" />

          {{ job.location.city }}, {{ job.location.country }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.job-card {
  position: relative;
  padding: var(--space-6);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition:
    background-color var(--duration-normal) var(--ease-standard),
    border-color var(--duration-normal) var(--ease-standard);
}

.job-card::before {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 0.25rem;
  background: var(--color-primary);
  content: "";
  transition: width var(--duration-normal) var(--ease-standard);
}

.job-card:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-strong);
}

.job-card-selected,
.job-card-selected:hover {
  background: var(--color-surface);
  border-color: var(--color-primary);
}

.job-card-selected::before {
  width: 0.375rem;
}

.job-card-content {
  display: grid;
  gap: var(--space-4);
}

.job-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-6);
}

.job-card-heading {
  display: grid;
  gap: var(--space-1);
  min-width: 0;
}

.job-card-company {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.job-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.job-card-location {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.job-card-location svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.job-card-bookmark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  color: var(--color-on-primary);
  background: var(--color-primary);
  border: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background-color var(--duration-normal) var(--ease-standard),
    transform var(--duration-normal) var(--ease-standard);
}

.job-card-bookmark:hover {
  background: var(--color-primary-hover);
}

.job-card-bookmark:active {
  transform: scale(0.96);
}

.job-card-bookmark:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.job-card-bookmark svg {
  width: 1rem;
  height: 1rem;
}
</style>
