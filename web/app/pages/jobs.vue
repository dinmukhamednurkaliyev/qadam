<script setup lang="ts">
import type { Job } from "~/types/job";

const { data: jobs, pending, error } = await useFetch<Job[]>("/api/jobs");
</script>

<template>
  <div>
    <PageHeader title="Jobs" description="Explore job opportunities and find your next role." />

    <p v-if="pending">Loading jobs...</p>

    <p v-else-if="error">Failed to load jobs.</p>

    <p v-else-if="!jobs?.length">No jobs found.</p>

    <JobList v-else :jobs="jobs" />
  </div>
</template>
