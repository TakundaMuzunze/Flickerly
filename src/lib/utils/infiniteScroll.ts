import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
import type { SortOptionKey } from '$lib/stores/movieStore.stores.svelte';

export async function handleScroll(
	genreId: string,
	sortBy: SortOptionKey,
	currentPage: number,
	totalPages: number,
	isLoading: boolean
) {
	if (isLoading || currentPage >= totalPages) {
		return;
	}

	const scrollPosition = window.innerHeight + window.scrollY;
	const threshold = document.documentElement.scrollHeight - 1000;

	if (scrollPosition >= threshold) {
		try {
			await fetchMovies(genreId, sortBy, currentPage + 1);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	}
}
