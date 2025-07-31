import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const thrillerMovies = await fetchMoviesByGenre(GENRES.thriller);
	return { thrillerMovies };
}
