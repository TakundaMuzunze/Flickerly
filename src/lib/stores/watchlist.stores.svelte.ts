import { browser } from '$app/environment';
import type { Movie } from '$lib/types/movie';
import { writable } from 'svelte/store';

const storedWatchlist = browser ? localStorage.getItem('watchlist') : null;

const initialWatchlist: Movie[] = storedWatchlist ? JSON.parse(storedWatchlist) : [];

export const watchlist = writable<Movie[]>(initialWatchlist);

if (browser) {
	watchlist.subscribe((value) => {
		localStorage.setItem('watchlist', JSON.stringify(value));
	});
	console.log('the list: ', watchlist);
}
