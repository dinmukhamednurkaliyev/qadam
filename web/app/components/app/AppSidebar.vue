<script setup lang="ts">
const items = [
  {
    label: "Dashboard",
    to: "/",
    icon: "lucide:layout-dashboard",
  },
  {
    label: "Jobs",
    to: "/jobs",
    icon: "lucide:briefcase-business",
  },
  {
    label: "Companies",
    to: "/companies",
    icon: "lucide:building-2",
  },
  {
    label: "Applications",
    to: "/applications",
    icon: "lucide:send",
  },
  {
    label: "Analytics",
    to: "/analytics",
    icon: "lucide:chart-no-axes-column-increasing",
  },
];
</script>

<template>
  <aside class="sidebar">
    <NuxtLink to="/" class="sidebar-brand">
      <img src="/logo.png" alt="Qadam" />
    </NuxtLink>

    <nav class="sidebar-nav">
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to">
        <Icon :name="item.icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
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

.sidebar-nav a:hover {
  color: var(--color-text);
  background: var(--color-surface-hover);
}

.sidebar-nav a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
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

@media (width <= 48rem) {
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
