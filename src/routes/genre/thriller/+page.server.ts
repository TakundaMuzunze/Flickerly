import { fetchThrillerMovies } from '$lib/server/thrillerMovies/+server';

export async function load() {
	const thrillerMovies = await fetchThrillerMovies();
	return { thrillerMovies };
}
