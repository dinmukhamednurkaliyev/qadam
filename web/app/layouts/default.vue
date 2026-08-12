<template>
  <div class="app-shell">
    <aside class="sidebar">
      <NuxtLink to="/" class="sidebar-brand">
        <img src="/logo.png" alt="Qadam" />
      </NuxtLink>

      <nav class="sidebar-nav">
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
      <div class="app-main-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  padding: var(--space-6);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
}

.sidebar-brand {
  display: block;
  margin-bottom: var(--space-8);
  text-decoration: none;
}

.sidebar-brand img {
  display: block;
  width: 100%;
  height: auto;
}

.sidebar-nav {
  display: grid;
  gap: var(--space-2);
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition:
    color var(--duration-normal) var(--ease-standard),
    background-color var(--duration-normal) var(--ease-standard);
}

.sidebar-nav a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.sidebar-nav a:hover {
  color: var(--color-text);
  background: var(--color-surface-hover);
}

.sidebar-nav a.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-surface-active);
  font-weight: var(--font-weight-semibold);
}

.sidebar-nav svg {
  width: var(--font-size-lg);
  height: var(--font-size-lg);
  flex-shrink: 0;
}

.app-main {
  min-width: 0;
  padding: var(--space-8);
}

.app-main-content {
  width: 100%;
  max-width: var(--content-width);
}

@media (width <= 48rem) {
  .app-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    padding: var(--space-4);
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .sidebar-brand {
    margin-bottom: var(--space-4);
  }

  .sidebar-nav {
    display: flex;
    overflow-x: auto;
  }

  .sidebar-nav a {
    flex-shrink: 0;
  }
}
</style>
