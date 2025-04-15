import { fetchScifiMovies } from '$lib/server/scifiMovies/+server';

export async function load() {
	const scifiMovies = await fetchScifiMovies();
	return { scifiMovies };
}
