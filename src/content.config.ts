import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    tagline: z.string(),
    introduction: z.string(),
    about: z.string(),
    joining: z.string(),
    floating: z.string(),
    competition: z.string(),
    email: z.email(),
  }),
});

const competitions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/competitions" }),
  schema: z.object({
    year: z.number(),
    title: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    featured: z.boolean().default(false),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sponsors" }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    logoAlt: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { pages, competitions, sponsors };
