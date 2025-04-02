import { fetchTopRated } from '$lib/server/topRated/+server';

export async function load() {
	const topRatedMovies = await fetchTopRated();
	return { topRatedMovies };
}
