import { fetchFantasyMovies } from '$lib/server/fantasyMovies/+server';

export async function load() {
	const fantasyMovies = await fetchFantasyMovies();
	return { fantasyMovies };
}
