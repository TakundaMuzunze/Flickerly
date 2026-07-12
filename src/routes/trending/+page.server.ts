import { fetchTrending, safeMovieResults } from '$lib/services/movies';

export async function load() {
	const trendingMovies = await safeMovieResults(fetchTrending());
	return { trendingMovies };
}
