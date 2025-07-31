import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const romanceMovies = await fetchMoviesByGenre(GENRES.romance);
	return { romanceMovies };
}
