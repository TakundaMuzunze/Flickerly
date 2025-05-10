import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
import type { SortOptionKey } from '$lib/stores/movieStore.stores.svelte';

export async function handleScroll(
	genreId: string,
	sortBy: SortOptionKey,
	currentPage: number,
	totalPages: number,
	isLoading: boolean
) {
	console.log('Scroll handler called:', {
		isLoading,
		currentPage,
		totalPages,
		scrollPosition: window.innerHeight + window.scrollY,
		threshold: document.documentElement.scrollHeight - 1000
	});

	if (isLoading || currentPage >= totalPages) {
		console.log('Not loading more:', { isLoading, currentPage, totalPages });
		return;
	}

	const scrollPosition = window.innerHeight + window.scrollY;
	const threshold = document.documentElement.scrollHeight - 1000;

	if (scrollPosition >= threshold) {
		console.log('Loading more movies...');
		try {
			await fetchMovies(genreId, sortBy, currentPage + 1);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	}
} 