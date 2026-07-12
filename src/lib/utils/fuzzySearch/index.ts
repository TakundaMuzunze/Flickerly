import Fuse from 'fuse.js';

type SearchableMovie = {
	title: string;
	overview: string;
};

export function createFuzzySearch<T>(items: T[], keys: string[]) {
	return new Fuse(items, {
		keys: keys.map((key) => ({
			name: key,
			weight: key === 'title' ? 0.9 : 0.1
		})),
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

export function fuzzySearchMovies<T extends SearchableMovie>(movies: T[], query: string) {
	const normalizedQuery = query.toLowerCase().trim();

	const fuse = createFuzzySearch(movies, ['title', 'overview']);
	const results = fuse.search(normalizedQuery);

	const processedResults = results
		.map((result) => ({
			...result.item,
			score: result.score
		}))
		.filter((result) => (result.score ?? 1) < 0.5);

	return processedResults;
}
