import { fetchGenres } from '$lib/services/genres';
import { setGenres } from '$lib/stores/genres.stores.svelte';

export async function load() {
	const genres = await fetchGenres();
	setGenres(genres);
	return { genres };
}
