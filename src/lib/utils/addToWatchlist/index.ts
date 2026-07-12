import { watchlist } from '$lib/stores/watchlist.stores.svelte';
import type { Movie } from '$lib/types/movie';

export function addToWatchlist(movie: Movie) {
	watchlist.update((list) => {
		if (!list.find((m) => m.id === movie.id)) {
			return [...list, movie];
		}
		return list;
	});
}

export function removeFromWatchlist(movieId: number) {
	watchlist.update((list) => list.filter((m) => m.id !== movieId));
}
