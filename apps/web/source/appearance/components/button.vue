<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary'

const properties = withDefaults(
  defineProps<{
    variant?: ButtonVariant
  }>(),
  {
    variant: 'primary',
  },
)
</script>

<template>
  <button class="button" :data-variant="properties.variant">
    <slot />
  </button>
</template>
