<script setup lang="ts">
const localePath = useLocalePath();

const items = [
  {
    label: "navigation.dashboard",
    to: "/",
    icon: "lucide:layout-dashboard",
  },
  {
    label: "navigation.jobs",
    to: "/jobs",
    icon: "lucide:briefcase-business",
  },
  {
    label: "navigation.companies",
    to: "/companies",
    icon: "lucide:building-2",
  },
  {
    label: "navigation.applications",
    to: "/applications",
    icon: "lucide:send",
  },
  {
    label: "navigation.analytics",
    to: "/analytics",
    icon: "lucide:chart-no-axes-column-increasing",
  },
];
</script>

<template>
  <aside class="sidebar">
    <NuxtLink :to="localePath('/')" class="sidebar-brand">
      <img src="/logo.png" alt="Qadam" />
    </NuxtLink>

    <nav class="sidebar-nav">
      <NuxtLink v-for="item in items" :key="item.to" :to="localePath(item.to)" class="sidebar-link">
        <Icon :name="item.icon" />

        <span>{{ $t(item.label) }}</span>
      </NuxtLink>
    </nav>

    <NuxtLink :to="localePath('/settings')" class="sidebar-link sidebar-settings">
      <Icon name="lucide:settings" />

      <span>{{ $t("settings.title") }}</span>
    </NuxtLink>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
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

.sidebar-link {
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

.sidebar-link:hover {
  color: var(--color-text);
  background: var(--color-surface-hover);
}

.sidebar-link:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.sidebar-link.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-surface-active);
  font-weight: var(--font-weight-semibold);
}

.sidebar-link svg {
  width: var(--font-size-lg);
  height: var(--font-size-lg);
  flex-shrink: 0;
}

.sidebar-settings {
  margin-top: auto;
}

@media (width <= 48rem) {
  .sidebar {
    min-height: auto;
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

  .sidebar-link {
    flex-shrink: 0;
  }

  .sidebar-settings {
    margin-top: var(--space-4);
  }
}
</style>
