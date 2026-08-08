import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/eslint", "@nuxt/icon"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [(await import("@tailwindcss/vite")).default()],
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
