import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const references = defineCollection({
  loader: file('src/content/references.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    source: z.enum(['github', 'aws', 'anthropic', 'azure', 'gcp', 'cncf', 'vendor', 'other']),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    note: z.string(),
  }),
});

export const collections = { blog, references };
