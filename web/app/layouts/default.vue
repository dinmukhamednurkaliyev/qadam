<template>
  <div class="app-shell">
    <AppSidebar />

    <main class="app-workspace">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  min-height: 100vh;
}

.app-workspace {
  min-width: 0;
  padding: var(--space-8);
}

@media (width <= 48rem) {
  .app-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
</style>
