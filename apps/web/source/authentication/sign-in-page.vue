<script setup lang="ts">
import { useLocalization } from '@/localization/use-localization'

const { translate } = useLocalization()
</script>

<template>
  <main class="page">
    <div class="content">
      <h1>{{ translate('common.authentication.signIn.title') }}</h1>

      <form class="form" @submit.prevent>
        <div class="field">
          <label for="email">
            {{ translate('common.authentication.signIn.emailLabel') }}
          </label>

          <input
            id="email"
            class="input"
            name="email"
            type="email"
            autocomplete="username"
            required
          />
        </div>

        <div class="field">
          <label for="password">
            {{ translate('common.authentication.signIn.passwordLabel') }}
          </label>

          <input
            id="password"
            class="input"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit">
          {{ translate('common.authentication.signIn.submit') }}
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.page {
  min-block-size: 100dvh;
  padding: var(--spacing-4);
}

.content {
  inline-size: 100%;
  max-inline-size: 28rem;
}

.form {
  display: grid;
  gap: var(--spacing-4);
}

.field {
  display: grid;
  gap: var(--spacing-2);
}

.input {
  inline-size: 100%;
  min-block-size: 2.75rem;
  padding-inline: var(--spacing-3);
  color: var(--color-text);
  background: var(--color-surface);
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-medium);
}

.input:focus-visible {
  border-color: var(--color-primary);
  outline: var(--focus-ring-width) solid var(--color-primary);
  outline-offset: var(--focus-ring-offset);
}
</style>
