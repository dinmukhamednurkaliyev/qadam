<script setup lang="ts">
import { useLocalization } from '@/localization/use-localization'

const { translate } = useLocalization()
</script>

<template>
  <main>
    <h1>{{ translate('common.authentication.signIn.title') }}</h1>

    <form @submit.prevent>
      <div>
        <label for="email">
          {{ translate('common.authentication.signIn.emailLabel') }}
        </label>

        <input id="email" name="email" type="email" />
      </div>

      <div>
        <label for="password">
          {{ translate('common.authentication.signIn.passwordLabel') }}
        </label>

        <input id="password" name="password" type="password" />
      </div>

      <button type="submit">
        {{ translate('common.authentication.signIn.submit') }}
      </button>
    </form>
  </main>
</template>
