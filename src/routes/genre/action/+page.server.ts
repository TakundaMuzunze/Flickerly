import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const actionMovies = await fetchMoviesByGenre(GENRES.action);
	return { actionMovies };
}
