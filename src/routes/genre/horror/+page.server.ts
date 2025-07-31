import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const horrorMovies = await fetchMoviesByGenre(GENRES.horror);
	return { horrorMovies };
}
