import { fetchInCinemas } from '$lib/server/latestReleases/+server';

export async function load() {
	const inCinemasMovies = await fetchInCinemas();
	return { inCinemasMovies };
}
