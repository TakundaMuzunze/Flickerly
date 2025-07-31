import { fetchTrending } from '$lib/services/movies';

export async function load() {
	const trendingMovies = await fetchTrending();
	return { trendingMovies };
}
