import type { Job } from "~/types/job";

export const jobs: Job[] = [
  {
    id: "frontend-developer-acme",
    title: "Frontend Developer",

    company: {
      name: "Acme",
      website: "https://example.com",
    },

    location: {
      city: "Almaty",
      country: "Kazakhstan",
    },

    description: "Build modern web interfaces using Vue, Nuxt and TypeScript.",

    createdAt: "2026-08-18T00:00:00.000Z",
    updatedAt: "2026-08-18T00:00:00.000Z",
  },

  {
    id: "nuxt-developer-nova",
    title: "Nuxt Developer",

    company: {
      name: "Nova",
    },

    location: {
      city: "Astana",
      country: "Kazakhstan",
    },

    description: "Develop and maintain full-stack applications with Nuxt.",

    createdAt: "2026-08-18T00:00:00.000Z",
    updatedAt: "2026-08-18T00:00:00.000Z",
  },
];
