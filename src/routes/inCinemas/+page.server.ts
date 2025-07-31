import { fetchInCinemas } from '$lib/services/movies';

export async function load() {
	const inCinemasMovies = await fetchInCinemas();
	return { inCinemasMovies };
}
