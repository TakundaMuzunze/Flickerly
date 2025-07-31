import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const scifiMovies = await fetchMoviesByGenre(GENRES.scifi);
	return { scifiMovies };
}
