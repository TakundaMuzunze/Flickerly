import Fuse from 'fuse.js';
import type { Movie } from '$lib/types/movie';

interface FuseResult {
	item: Movie;
	score?: number;
}

export function createFuzzySearch<T>(items: T[], keys: string[]) {
	return new Fuse(items, {
		keys: [
			{ name: 'title', weight: 0.9 },
			{ name: 'overview', weight: 0.1 }
		],
		threshold: 0.2,
		distance: 300,
		includeScore: true,
		includeMatches: true,
		minMatchCharLength: 2,
		ignoreLocation: true,
		useExtendedSearch: true,
		findAllMatches: true,
		shouldSort: true,
		isCaseSensitive: false
	});
}

export function fuzzySearchMovies(movies: Movie[], query: string): Movie[] {
	const normalizedQuery = query.toLowerCase().trim();

	const fuse = createFuzzySearch(movies, ['title', 'overview']);
	const results = fuse.search(normalizedQuery) as FuseResult[];

	const processedResults = results
		.map((result) => ({
			...result.item,
			score: result.score ?? 1
		}))
		.filter((result) => result.score < 0.5);

	return processedResults;
}
