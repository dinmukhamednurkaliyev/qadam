<script setup lang="ts">
import type { Job } from "~/types/job";

const props = defineProps<{
  job: Job;
}>();

const companyInitial = computed(() => props.job.company.name.charAt(0).toUpperCase());
</script>

<template>
  <article class="job-details">
    <header class="job-details-banner">
      <div class="job-details-company-logo">
        {{ companyInitial }}
      </div>

      <div class="job-details-company-info">
        <a
          v-if="job.company.website"
          class="job-details-company"
          :href="job.company.website"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ job.company.name }}

          <Icon name="lucide:external-link" />
        </a>

        <p v-else class="job-details-company">
          {{ job.company.name }}
        </p>
      </div>
    </header>

    <div class="job-details-main">
      <section class="job-details-overview">
        <div class="job-details-heading">
          <h2>{{ job.title }}</h2>

          <span class="job-details-location">
            <Icon name="lucide:map-pin" />

            {{ job.location.city }}, {{ job.location.country }}
          </span>
        </div>

        <button class="job-details-bookmark" type="button" aria-label="Save job">
          <Icon name="lucide:bookmark" />
        </button>
      </section>

      <hr class="job-details-divider" />

      <section class="job-details-body">
        <h3>About this job</h3>

        <div class="job-details-content">
          {{ job.description }}
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.job-details {
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.job-details-banner {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: 8rem;
  padding: var(--space-6);
  background: var(--color-primary);
}

.job-details-company-logo {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  color: var(--color-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.job-details-company-info {
  display: grid;
  gap: var(--space-2);
}

.job-details-company {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: fit-content;
  color: var(--color-on-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}

a.job-details-company:hover {
  text-decoration: underline;
}

a.job-details-company:focus-visible {
  outline: 2px solid var(--color-on-primary);
  outline-offset: 2px;
}

.job-details-company svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.job-details-website {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: fit-content;
  color: var(--color-on-primary);
  font-size: var(--font-size-sm);
  text-decoration: none;
  opacity: 0.8;
  transition: opacity var(--duration-normal) var(--ease-standard);
}

.job-details-website:hover {
  opacity: 1;
}

.job-details-website:focus-visible {
  outline: 2px solid var(--color-on-primary);
  outline-offset: 2px;
}

.job-details-website svg {
  width: 1rem;
  height: 1rem;
}

.job-details-main {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
}

.job-details-overview {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-6);
}

.job-details-heading {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.job-details-location {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: fit-content;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.job-details-location svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.job-details-bookmark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
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

.job-details-bookmark:hover {
  background: var(--color-primary-hover);
}

.job-details-bookmark:active {
  transform: scale(0.96);
}

.job-details-bookmark:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.job-details-bookmark svg {
  width: 1rem;
  height: 1rem;
}

.job-details-divider {
  width: 100%;
  height: 1px;
  margin: 0;
  background: var(--color-border);
  border: 0;
}

.job-details-body {
  display: grid;
  gap: var(--space-4);
}

.job-details-content {
  max-width: 68ch;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  white-space: pre-line;
}
</style>
