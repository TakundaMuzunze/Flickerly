import { fetchActionMovies } from '$lib/server/actionMovies/+server';

export async function load() {
	const actionMovies = await fetchActionMovies();
	return { actionMovies };
}
