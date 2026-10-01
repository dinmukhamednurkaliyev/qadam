<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/appearance/components/button.vue'
import TextField from '@/appearance/components/text-field.vue'
import { useLocalization } from '@/localization/use-localization'

const { translate } = useLocalization()

const email = ref('')
const password = ref('')
</script>

<template>
  <main class="page">
    <div>
      <h1>
        {{ translate('common.authentication.signIn.title') }}
      </h1>

      <form @submit.prevent>
        <TextField
          v-model="email"
          input-id="email"
          :label="translate('common.authentication.signIn.emailLabel')"
          name="email"
          type="email"
          autocomplete="username"
          variant="outlined"
          required
        />

        <TextField
          v-model="password"
          input-id="password"
          :label="translate('common.authentication.signIn.passwordLabel')"
          name="password"
          type="password"
          autocomplete="current-password"
          variant="outlined"
          required
        />

        <Button type="submit" variant="primary">
          {{ translate('common.authentication.signIn.submit') }}
        </Button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  min-block-size: 100dvh;
  place-items: center;
}
</style>
