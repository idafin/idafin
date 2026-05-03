import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/services" }),
  schema: z.object({
    order: z.number(),
    number: z.string(),
    title: z.string(),
    description: z.string(),
    bullets: z.array(z.string()),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/cases" }),
  schema: z.object({
    order: z.number(),
    sector: z.string(),
    year: z.string(),
    title: z.string(),
    metric: z.string(),
    metricLabel: z.string(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/insights" }),
  schema: z.object({
    order: z.number(),
    date: z.string(),
    category: z.string(),
    title: z.string(),
    readMinutes: z.number(),
  }),
});

export const collections = { services, cases, insights };
