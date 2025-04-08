import { fetchHorrorMovies } from '$lib/server/horrorMovies/+server';

export async function load() {
	const horrorMovies = await fetchHorrorMovies();
	return { horrorMovies };
}
