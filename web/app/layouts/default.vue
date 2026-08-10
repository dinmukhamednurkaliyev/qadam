<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar__brand">Qadam</div>

      <nav class="sidebar__nav">
        <NuxtLink to="/">
          <Icon name="lucide:layout-dashboard" />
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/jobs">
          <Icon name="lucide:briefcase-business" />
          <span>Jobs</span>
        </NuxtLink>

        <NuxtLink to="/applications">
          <Icon name="lucide:send" />
          <span>Applications</span>
        </NuxtLink>

        <NuxtLink to="/analytics">
          <Icon name="lucide:chart-no-axes-column-increasing" />
          <span>Analytics</span>
        </NuxtLink>
      </nav>
    </aside>

    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-main {
  padding: var(--space-8);
}

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

.sidebar__nav a {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.sidebar__nav a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.sidebar__nav a:hover {
  color: var(--color-text);
  background: var(--color-background);
}

.sidebar__nav a.router-link-exact-active {
  color: var(--color-text);
  background: var(--color-background);
  font-weight: 600;
}

.sidebar__nav svg {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}
</style>
