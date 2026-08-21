<script setup lang="ts">
import type { Job } from "~/types/job";

defineProps<{
  job: Job;
}>();
</script>

<template>
  <article>
    <h2>{{ job.title }}</h2>
    <p>{{ job.company.name }}</p>
    <p>{{ job.location.city }}, {{ job.location.country }}</p>
    <p v-if="job.description">
      {{ job.description }}
    </p>
  </article>
</template>
