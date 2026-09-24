<script setup lang="ts">
type TextFieldVariant = 'outlined' | 'filled'

defineOptions({
  inheritAttrs: false,
})

const properties = withDefaults(
  defineProps<{
    inputId: string
    label: string
    variant?: TextFieldVariant
  }>(),
  {
    variant: 'outlined',
  },
)

const model = defineModel<string>({
  required: true,
})
</script>

<template>
  <div :data-variant="properties.variant">
    <label :for="properties.inputId">
      {{ properties.label }}
    </label>

    <input :id="properties.inputId" v-model="model" v-bind="$attrs" />
  </div>
</template>
