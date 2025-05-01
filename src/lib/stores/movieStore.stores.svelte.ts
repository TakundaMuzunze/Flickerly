import type Trailer from '$lib/components/TrailerComponent/Trailer.svelte';
import type { Movie } from '$lib/types/movie';
import { writable, get } from 'svelte/store';

const TMDB_API_KEY = import.meta.env.TMDB_KEY;

export const movieStore = writable<{
	movies: Movie[];
	selectedMovie: Movie | null;
	trailer: Trailer | null;
	sortBy: 'popularity' | 'rating' | 'release_desc' | 'release_asc';
	currentGenreId: string | null;
	currentPage: number;
	totalPages: number;
}>({
	movies: [],
	selectedMovie: null,
	trailer: null,
	sortBy: 'popularity',
	currentGenreId: null,
	currentPage: 1,
	totalPages: 1
});

export type SortOptionKey = 'popularity' | 'rating' | 'release_desc' | 'release_asc';

const sortOptions: Record<SortOptionKey, string> = {
	popularity: 'popularity.desc',
	rating: 'vote_average.desc',
	release_desc: 'release_date.desc',
	release_asc: 'release_date.asc'
};

export async function fetchMovies(genreId: string, sortOptionKey: SortOptionKey, page: number = 1) {
	console.log('=== fetchMovies called ===');
	console.log('Parameters:', { genreId, sortOptionKey, page });

	const sortValue = sortOptions[sortOptionKey];
	if (!sortValue) {
		console.error('Invalid sort option key:', sortOptionKey);
		throw new Error('Invalid sort option');
	}

	const url = `/api/genre/${genreId}?sortBy=${sortValue}&page=${page}`;

	try {
		console.log('Making API request...');
		const response = await fetch(url);
		console.log('Response status:', response.status);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(data.error);
		}

		movieStore.update((store) => {
			const newStore = {
				...store,
				movies: data.results,
				sortBy: sortOptionKey,
				currentGenreId: genreId,
				currentPage: page,
				totalPages: data.total_pages
			};

			return newStore;
		});
	} catch (error) {
		console.error('Error in fetchMovies:', error);
		throw error;
	}
}

export async function sortMovies(sortBy: SortOptionKey): Promise<void> {
	const store = get(movieStore);
	if (store.currentGenreId) {
		await fetchMovies(store.currentGenreId, sortBy, 1);
	}
}

export function setMovies(movies: Movie[]): void {
	movieStore.update((store) => ({
		...store,
		movies
	}));
}
