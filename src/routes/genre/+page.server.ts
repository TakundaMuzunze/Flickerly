import { fetchMoviesByGenre } from '$lib/services/movies';
import { GENRE_PAGES, GENRE_SLUGS } from '$lib/constants/genres';

export async function load() {
	const entries = await Promise.all(
		GENRE_SLUGS.map(async (slug) => {
			const movies = await fetchMoviesByGenre(GENRE_PAGES[slug].id);
			return [slug, movies] as const;
		})
	);

	return {
		genres: Object.fromEntries(entries)
	};
}
