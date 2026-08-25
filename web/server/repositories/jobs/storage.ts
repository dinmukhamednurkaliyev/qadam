import type { Job } from "~/types/job";

export const jobs: Job[] = [
  {
    id: "frontend-developer-acme",
    title: "Frontend Developer",

    description: `We are looking for a Frontend Developer to join our product team and help build modern web applications.

What you'll do:
- Build and maintain user interfaces with Vue and Nuxt
- Work with TypeScript and REST APIs
- Collaborate with designers and backend developers
- Review code and improve existing features
- Help maintain a clean and scalable frontend architecture

What we're looking for:
- Experience with Vue or another modern frontend framework
- Good knowledge of JavaScript and TypeScript
- Understanding of HTML and modern CSS
- Experience working with Git
- Ability to write clean and readable code

We offer:
- Full-time employment
- Flexible working hours
- Modern development tools
- Opportunities to grow with the product`,

    company: {
      name: "Acme",
      website: "https://example.com",
    },

    location: {
      city: "Almaty",
      country: "Kazakhstan",
    },

    createdAt: "2026-08-18T00:00:00.000Z",
    updatedAt: "2026-08-18T00:00:00.000Z",
  },

  {
    id: "nuxt-developer-nova",
    title: "Nuxt Developer",

    description: `Nova is looking for a Nuxt Developer to work on full-stack web products.

You will work with Nuxt, Vue and TypeScript to develop new features and maintain existing applications.

Responsibilities:
- Develop frontend and server-side features with Nuxt
- Integrate external APIs
- Improve application performance
- Write maintainable and reusable code
- Participate in code reviews

Requirements:
- Experience with Vue and Nuxt
- Good TypeScript knowledge
- Understanding of SSR and web fundamentals
- Familiarity with Git and REST APIs

We value practical engineering, simple solutions and readable code.`,

    company: {
      name: "Nova",
    },

    location: {
      city: "Astana",
      country: "Kazakhstan",
    },

    createdAt: "2026-08-18T00:00:00.000Z",
    updatedAt: "2026-08-18T00:00:00.000Z",
  },
];
