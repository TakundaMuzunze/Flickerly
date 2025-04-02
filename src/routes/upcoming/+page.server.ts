import { fetchUpcoming } from '$lib/server/upcomingMovies/+server';

export async function load() {
	const upcomingMovies = await fetchUpcoming();
	return { upcomingMovies };
}
