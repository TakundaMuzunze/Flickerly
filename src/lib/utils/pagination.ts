import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
import type { SortOptionKey } from '$lib/stores/movieStore.stores.svelte';

export async function handlePageChange(
	genreId: string,
	sortBy: SortOptionKey,
	newPage: number,
	currentPage: number,
	totalPages: number,
	onLoadingChange: (loading: boolean) => void,
	onScroll?: () => void
) {
	if (newPage >= 1 && newPage <= totalPages) {
		onLoadingChange(true);
		try {
			await fetchMovies(genreId, sortBy, newPage);
			if (onScroll) {
				onScroll();
			}
		} catch (error) {
			console.error('Error fetching new page:', error);
		} finally {
			onLoadingChange(false);
		}
	}
} 