import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const reviews = defineCollection({
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		venue: z.string(),
		city: z.string(),
		neighborhood: z.string().optional(),
		cuisine: z.string(),
		pubDate: z.coerce.date(),
		photo: z.string(),
		photoAlt: z.string().optional(),
		standoutDishes: z.array(z.string()).default([]),
		rating: z.number().min(0).max(5).optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { reviews };
