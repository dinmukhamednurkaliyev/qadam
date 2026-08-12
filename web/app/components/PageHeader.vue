<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <header class="page-header">
    <h1 class="page-header-title">{{ title }}</h1>
    <p v-if="description" class="page-header-description">{{ description }}</p>
  </header>
</template>

<style scoped>
.page-header {
  margin-bottom: var(--space-8);
}

.page-header-title {
  margin: 0;
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.page-header-description {
  margin: var(--space-2) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
}
</style>
