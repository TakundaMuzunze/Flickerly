import { fetchTopRated } from '$lib/services/movies';

export async function load() {
	const topRatedMovies = await fetchTopRated();
	return { topRatedMovies };
}
