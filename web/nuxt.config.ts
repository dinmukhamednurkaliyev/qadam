import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/eslint", "@nuxt/icon", "motion-v/nuxt"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  app: {
    head: {
      title: "Qadam",
      meta: [
        {
          name: "description",
          content: "Job search and application tracking platform",
        },
      ],
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
