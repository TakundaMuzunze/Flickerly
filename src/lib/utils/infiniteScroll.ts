import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
import type { SortOptionKey } from '$lib/stores/movieStore.stores.svelte';

let lastScrollY = 0;
let lastScrollTime = 0;
const SCROLL_DEBOUNCE = 200; // 200ms debounce

export async function handleScroll(
	genreId: string,
	sortBy: SortOptionKey,
	currentPage: number,
	totalPages: number,
	isLoading: boolean
) {
	// If we've reached the last page or are loading, don't do anything
	if (isLoading || currentPage >= totalPages) {
		return;
	}

	// Debounce scroll events
	const now = Date.now();
	if (now - lastScrollTime < SCROLL_DEBOUNCE) {
		return;
	}
	lastScrollTime = now;

	// Check if we're scrolling down
	const currentScrollY = window.scrollY;
	if (currentScrollY < lastScrollY) {
		lastScrollY = currentScrollY;
		return; // Don't load more if scrolling up
	}
	lastScrollY = currentScrollY;

	const scrollPosition = window.innerHeight + window.scrollY;
	const totalHeight = document.documentElement.scrollHeight;
	const scrollPercentage = (scrollPosition / totalHeight) * 100;

	// Only trigger when we're at 90% of the total scroll height
	if (scrollPercentage >= 90) {
		try {
			// If we're on the last page, don't try to fetch more
			if (currentPage >= totalPages) {
				return;
			}
			await fetchMovies(genreId, sortBy, currentPage + 1);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	}
}
