<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar__brand">Qadam</div>

      <nav class="sidebar__nav">
        <NuxtLink to="/">Dashboard</NuxtLink>
        <NuxtLink to="/jobs">Jobs</NuxtLink>
        <NuxtLink to="/applications">Applications</NuxtLink>
        <NuxtLink to="/analytics">Analytics</NuxtLink>
      </nav>
    </aside>

    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 16rem 1fr;
  min-height: 100vh;
}

.sidebar {
  border-right: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: var(--space-6);
}

.sidebar__brand {
  margin-bottom: var(--space-8);
  font-size: 1.25rem;
  font-weight: 700;
}

.sidebar__nav {
  display: grid;
  gap: var(--space-2);
}
мп
.app-main {
  padding: var(--space-8);
}
</style>
