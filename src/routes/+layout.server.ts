import { getGenre } from '$lib/server/movieGenres/+server';

export async function load() {
	const genres = await getGenre();
	return { genres };
}
