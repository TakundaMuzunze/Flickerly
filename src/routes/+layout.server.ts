import { getGenre } from '$lib/server/movieGenres/+server';
import { setGenres } from '$lib/stores/genres.stores.svelte';

export async function load() {
	const genres = await getGenre();
	setGenres(genres);
	return { genres };
}
