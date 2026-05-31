import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const reviews = await getCollection('reviews');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: reviews
			.filter((r) => !r.data.draft)
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((review) => ({
				title: review.data.title,
				pubDate: review.data.pubDate,
				link: `/reviews/${review.id}/`,
			})),
	});
}
