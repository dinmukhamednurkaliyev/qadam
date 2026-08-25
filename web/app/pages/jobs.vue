<script setup lang="ts">
import type { JobEntity } from "~/types/jobs/job-entity";

const { data: jobs, pending, error } = await useFetch<JobEntity[]>("/api/jobs");

const selectedJobId = ref<string | null>(null);

const selectedJob = computed(() => {
  return jobs.value?.find((job) => job.id === selectedJobId.value) ?? null;
});
</script>

<template>
  <div class="jobs-page">
    <PageHeader :title="$t('jobs.title')" :description="$t('jobs.description')" />

    <div v-if="pending" class="jobs-state">
      <div class="jobs-state-icon">
        <Icon name="lucide:loader-circle" />
      </div>

      <div class="jobs-state-content">
        <h2>{{ $t("jobs.loading.title") }}</h2>

        <p>{{ $t("jobs.loading.description") }}</p>
      </div>
    </div>

    <div v-else-if="error" class="jobs-state">
      <div class="jobs-state-icon">
        <Icon name="lucide:circle-alert" />
      </div>

      <div class="jobs-state-content">
        <h2>{{ $t("jobs.error.title") }}</h2>

        <p>{{ $t("jobs.error.description") }}</p>
      </div>
    </div>

    <div v-else-if="!jobs?.length" class="jobs-state">
      <div class="jobs-state-icon">
        <Icon name="lucide:briefcase-business" />
      </div>

      <div class="jobs-state-content">
        <h2>{{ $t("jobs.empty.title") }}</h2>

        <p>{{ $t("jobs.empty.description") }}</p>
      </div>
    </div>

    <div v-else class="jobs-workspace">
      <section class="jobs-workspace-list">
        <JobList :jobs="jobs" :selected-job-id="selectedJobId" @select="selectedJobId = $event" />
      </section>

      <aside class="jobs-workspace-details">
        <JobDetails v-if="selectedJob" :job="selectedJob" />

        <div v-else class="jobs-empty-details">
          <div class="jobs-empty-details-icon">
            <Icon name="lucide:panel-right-open" />
          </div>

          <div class="jobs-empty-details-content">
            <h2>{{ $t("jobs.details.title") }}</h2>

            <p>{{ $t("jobs.details.description") }}</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.jobs-page {
  display: grid;
  gap: var(--space-6);
}

.jobs-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 1fr);
  align-items: start;
  gap: var(--space-6);
}

.jobs-workspace-list,
.jobs-workspace-details {
  min-width: 0;
}

.jobs-state,
.jobs-empty-details {
  display: grid;
  place-items: center;
  align-content: center;
  gap: var(--space-4);
  min-height: 20rem;
  padding: var(--space-8);
  text-align: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.jobs-state-icon,
.jobs-empty-details-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  color: var(--color-primary);
  background: var(--color-surface-active);
  border-radius: var(--radius-md);
}

.jobs-state-icon svg,
.jobs-empty-details-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.jobs-state-content,
.jobs-empty-details-content {
  display: grid;
  gap: var(--space-2);
  max-width: 20rem;
}

.jobs-state-content p,
.jobs-empty-details-content p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
