import { fetchTrending } from '$lib/server/trendingMovies/+server';

export async function load() {
	const trendingMovies = await fetchTrending();
	return { trendingMovies };
}
