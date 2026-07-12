import { fetchInCinemas, safeMovieResults } from '$lib/services/movies';

export async function load() {
	const inCinemasMovies = await safeMovieResults(fetchInCinemas());
	return { inCinemasMovies };
}
