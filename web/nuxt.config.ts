import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/eslint", "@nuxt/icon", "motion-v/nuxt", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.json",
      },
      {
        code: "ru",
        name: "Русский",
        language: "ru-RU",
        file: "ru.json",
      },
    ],
  },
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
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
