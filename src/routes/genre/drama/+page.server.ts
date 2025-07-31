import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const dramaMovies = await fetchMoviesByGenre(GENRES.drama);
	return { dramaMovies };
}
