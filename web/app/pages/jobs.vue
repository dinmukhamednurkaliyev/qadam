<script setup lang="ts">
import type { Job } from "~/types/job";

const { data: jobs, pending, error } = await useFetch<Job[]>("/api/jobs");

const selectedJobId = ref<string | null>(null);

const selectedJob = computed(() => {
  return jobs.value?.find((job) => job.id === selectedJobId.value) ?? null;
});
</script>

<template>
  <div class="jobs-page">
    <PageHeader title="Jobs" description="Explore job opportunities and find your next role." />

    <div class="jobs-workspace">
      <section class="jobs-workspace-list">
        <p v-if="pending">Loading jobs...</p>

        <p v-else-if="error">Failed to load jobs.</p>

        <p v-else-if="!jobs?.length">No jobs found.</p>

        <JobList v-else :jobs="jobs" @select="selectedJobId = $event" />
      </section>

      <aside class="jobs-workspace-details">
        <JobDetails v-if="selectedJob" :job="selectedJob" />

        <p v-else>Select a job to view details.</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.jobs-workspace {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(20rem, 3fr);
  gap: var(--space-6);
}
</style>
