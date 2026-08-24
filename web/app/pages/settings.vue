<script setup lang="ts">
const { locale, locales } = useI18n();

const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="settings-page">
    <PageHeader :title="$t('settings.title')" :description="$t('settings.description')" />

    <section class="settings-language">
      <header class="settings-language-header">
        <div class="settings-language-icon">
          <Icon name="lucide:languages" />
        </div>

        <div class="settings-language-heading">
          <h2>{{ $t("settings.language.title") }}</h2>

          <p>{{ $t("settings.language.description") }}</p>
        </div>
      </header>

      <div class="settings-language-options">
        <button
          @click="navigateTo(switchLocalePath(item.code))"
          v-for="item in locales"
          :key="item.code"
          class="settings-language-option"
          :class="{ 'settings-language-option-selected': item.code === locale }"
          type="button"
        >
          <div class="settings-language-visual">
            <span class="settings-language-code">
              {{ item.code.toUpperCase() }}
            </span>
          </div>

          <div class="settings-language-footer">
            <span class="settings-language-name">
              {{ item.name }}
            </span>

            <Icon v-if="item.code === locale" name="lucide:check" class="settings-language-check" />
          </div>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.settings-page {
  display: grid;
  gap: var(--space-6);
}

.settings-language {
  display: grid;
  gap: var(--space-6);
  max-width: 48rem;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.settings-language-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.settings-language-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  color: var(--color-on-primary);
  background: var(--color-primary);
  border-radius: var(--radius-md);
}

.settings-language-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.settings-language-heading {
  display: grid;
  gap: var(--space-1);
}

.settings-language-heading p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.settings-language-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.settings-language-option {
  display: grid;
  grid-template-rows: 7rem auto;
  padding: 0;
  overflow: hidden;
  color: var(--color-text);
  text-align: left;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--duration-normal) var(--ease-standard),
    border-color var(--duration-normal) var(--ease-standard),
    transform var(--duration-normal) var(--ease-standard);
}

.settings-language-option:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-strong);
}

.settings-language-option-selected,
.settings-language-option-selected:hover {
  border-color: var(--color-primary);
}

.settings-language-option:active {
  transform: scale(0.98);
}

.settings-language-option:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.settings-language-visual {
  display: grid;
  place-items: center;
  background: var(--color-primary);
}

.settings-language-code {
  color: var(--color-on-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.settings-language-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
}

.settings-language-name {
  font-weight: var(--font-weight-semibold);
}

.settings-language-check {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--color-primary);
}

@media (width <= 48rem) {
  .settings-language-options {
    grid-template-columns: 1fr;
  }
}
</style>
