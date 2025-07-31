import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const fantasyMovies = await fetchMoviesByGenre(GENRES.fantasy);
	return { fantasyMovies };
}
