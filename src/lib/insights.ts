import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './slug';

export type InsightPost = CollectionEntry<'insights'>;

/** Posts nao-rascunho, ordenados do mais recente para o mais antigo. */
export async function getPublishedInsights(): Promise<InsightPost[]> {
	const posts = await getCollection('insights', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export interface TaxonomyGroup {
	/** Slug usado na URL (/insights/categoria/[slug] ou /insights/tag/[slug]). */
	slug: string;
	/** Rotulo original, como escrito no frontmatter, usado para exibicao. */
	name: string;
	posts: InsightPost[];
}

function groupBy(posts: InsightPost[], extract: (post: InsightPost) => string[]): TaxonomyGroup[] {
	const groups = new Map<string, TaxonomyGroup>();

	for (const post of posts) {
		for (const label of extract(post)) {
			const slug = slugify(label);
			if (!slug) continue;
			const existing = groups.get(slug);
			if (existing) {
				existing.posts.push(post);
			} else {
				groups.set(slug, { slug, name: label, posts: [post] });
			}
		}
	}

	// Mantem a ordem por numero de posts (desc), depois alfabetica.
	return [...groups.values()].sort(
		(a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name, 'pt-BR')
	);
}

/** Agrupa os posts publicados por categoria (um post tem exatamente uma categoria). */
export function groupByCategory(posts: InsightPost[]): TaxonomyGroup[] {
	return groupBy(posts, (post) => [post.data.category]);
}

/** Agrupa os posts publicados por tag (um post pode ter varias tags). */
export function groupByTag(posts: InsightPost[]): TaxonomyGroup[] {
	return groupBy(posts, (post) => post.data.tags);
}

/**
 * Sugere ate `limit` posts relacionados a `current`: prioriza a mesma
 * categoria, soma pontos por tag em comum e usa a data como desempate,
 * garantindo que sempre haja sugestoes mesmo sem nenhuma taxonomia em comum.
 */
export function getRelatedInsights(current: InsightPost, allPosts: InsightPost[], limit = 3): InsightPost[] {
	const currentTagSlugs = new Set(current.data.tags.map(slugify));

	return allPosts
		.filter((post) => post.id !== current.id)
		.map((post) => {
			let score = 0;
			if (slugify(post.data.category) === slugify(current.data.category)) score += 2;
			score += post.data.tags.filter((tag) => currentTagSlugs.has(slugify(tag))).length;
			return { post, score };
		})
		.sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
		.slice(0, limit)
		.map((entry) => entry.post);
}
