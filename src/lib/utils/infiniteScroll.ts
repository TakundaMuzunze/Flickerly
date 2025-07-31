import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
import type { SortOptionKey } from '$lib/stores/movieStore.stores.svelte';

let lastScrollY = 0;
let lastScrollTime = 0;
const SCROLL_DEBOUNCE = 200;

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
			if (currentPage >= totalPages) {
				return;
			}
			await fetchMovies(genreId, sortBy, currentPage + 1);
		} catch (error) {
			console.error('Error loading more movies:', error);
		}
	}
}
