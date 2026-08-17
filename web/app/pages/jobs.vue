<script setup lang="ts">
import type { Job } from "~/types/job";

const { data: jobs, pending, error } = await useFetch<Job[]>("/api/jobs");
</script>

<template>
  <div>
    <PageHeader title="Jobs" description="Track and manage job opportunities in one place." />

    <p v-if="pending">Loading jobs...</p>

    <p v-else-if="error">Failed to load jobs.</p>

    <p v-else-if="!jobs?.length">No jobs yet.</p>

    <div v-else class="jobs-list">
      <JobCard v-for="job in jobs" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<style scoped>
.jobs-list {
  display: grid;
  gap: var(--space-4);
}
</style>
