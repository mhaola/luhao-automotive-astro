/**
 * Converte um texto livre (categoria, tag) em um slug de URL estavel.
 * Remove acentos, baixa a caixa e troca qualquer sequencia de caracteres
 * nao alfanumericos por um unico hifen.
 */
export function slugify(value: string): string {
	const COMBINING_DIACRITICS = /[\u0300-\u036f]/g;
	return value
		.normalize('NFD')
		.replace(COMBINING_DIACRITICS, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
