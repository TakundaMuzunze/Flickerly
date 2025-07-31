import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const comedyMovies = await fetchMoviesByGenre(GENRES.comedy);
	return { comedyMovies };
}
