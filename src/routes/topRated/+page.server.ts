import { fetchTopRated, safeMovieResults } from '$lib/services/movies';

export async function load() {
	const topRatedMovies = await safeMovieResults(fetchTopRated());
	return { topRatedMovies };
}
