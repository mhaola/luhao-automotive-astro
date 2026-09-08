import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config/site';
import { getPublishedInsights } from '../lib/insights';

export async function GET(context: APIContext) {
	const posts = await getPublishedInsights();

	return rss({
		title: `${site.name} — Insights`,
		description: 'Conteúdo prático sobre geração de demanda, qualificação e inteligência para operações automotivas.',
		site: context.site ?? site.url,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/insights/${post.id}`,
			categories: [post.data.category, ...post.data.tags],
		})),
		customData: '<language>pt-br</language>',
	});
}
