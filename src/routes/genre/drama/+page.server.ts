import { fetchDramaMovies } from '$lib/server/dramaMovies/+server';

export async function load() {
	const dramaMovies = await fetchDramaMovies();
	return { dramaMovies };
}
