import { get } from 'svelte/store';
import { fetchMovies, movieStore } from '$lib/stores/movieStore.stores.svelte';

let lastScrollY = 0;
let lastScrollTime = 0;
const SCROLL_DEBOUNCE = 200;

export async function handleScroll(listKey: string) {
	const { isLoading, isLoadingMore, currentPage, totalPages, sortBy } = get(movieStore);

	if (isLoading || isLoadingMore || currentPage >= totalPages) {
		return;
	}

	const now = Date.now();
	if (now - lastScrollTime < SCROLL_DEBOUNCE) {
		return;
	}
	lastScrollTime = now;

	const currentScrollY = window.scrollY;
	if (currentScrollY < lastScrollY) {
		lastScrollY = currentScrollY;
		return;
	}
	lastScrollY = currentScrollY;

	const scrollPosition = window.innerHeight + window.scrollY;
	const totalHeight = document.documentElement.scrollHeight;
	const scrollPercentage = (scrollPosition / totalHeight) * 100;

	if (scrollPercentage >= 90) {
		try {
			await fetchMovies(listKey, sortBy, currentPage + 1);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	}
}
