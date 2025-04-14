import { fetchRomanceMovies } from '$lib/server/romanceMovies/+server';

export async function load() {
	const romanceMovies = await fetchRomanceMovies();
	return { romanceMovies };
}
