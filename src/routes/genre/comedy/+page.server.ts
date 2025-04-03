import { fetchComedyMovies } from '$lib/server/comedyMovies/+server';

export async function load() {
	const comedyMovies = await fetchComedyMovies();
	return { comedyMovies };
}
