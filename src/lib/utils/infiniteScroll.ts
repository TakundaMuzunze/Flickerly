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
	const totalHeight = document.documentElement.scrollHeight;
	const scrollPercentage = (scrollPosition / totalHeight) * 100;

	// Only trigger when we're at 90% of the total scroll height
	if (scrollPercentage >= 90) {
		try {
			await fetchMovies(genreId, sortBy, currentPage + 1);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	}
}
