import type Trailer from '$lib/components/TrailerComponent/Trailer.svelte';
import type { Movie } from '$lib/types/movie';
import { writable, get } from 'svelte/store';

const TMDB_API_KEY = import.meta.env.TMDB_KEY;

const initialState = {
	movies: [],
	selectedMovie: null,
	trailer: null,
	sortBy: 'popularity' as const,
	currentGenreId: null,
	currentPage: 1,
	totalPages: 1
};

export const movieStore = writable<{
	movies: Movie[];
	selectedMovie: Movie | null;
	trailer: Trailer | null;
	sortBy: 'popularity' | 'rating' | 'release_desc' | 'release_asc';
	currentGenreId: string | null;
	currentPage: number;
	totalPages: number;
}>(initialState);

export type SortOptionKey = 'popularity' | 'rating' | 'release_desc' | 'release_asc';

const sortOptions: Record<SortOptionKey, string> = {
	popularity: 'popularity.desc',
	rating: 'vote_average.desc',
	release_desc: 'release_date.desc',
	release_asc: 'release_date.asc'
};

export function resetStore() {
	movieStore.set(initialState);
}

export async function fetchMovies(genreId: string, sortOptionKey: SortOptionKey, page: number = 1) {
	const sortValue = sortOptions[sortOptionKey];
	if (!sortValue) {
		console.error('Invalid sort option key:', sortOptionKey);
		throw new Error('Invalid sort option');
	}

	let url: string;
	if (genreId === 'trending') {
		url = `/api/movies/trending?page=${page}`;
	} else if (genreId === 'top_rated') {
		url = `/api/movies/top-rated?page=${page}`;
	} else if (genreId === 'now_playing') {
		url = `/api/movies/now-playing?page=${page}`;
	} else {
		url = `/api/genre/${genreId}?sortBy=${sortValue}&page=${page}`;
	}

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		if (data.error) {
			throw new Error(data.error);
		}

		movieStore.update((store) => {
			// Filter out any duplicate movies by ID
			const existingIds = new Set(store.movies.map((movie) => movie.id));
			const newMovies =
				page === 1
					? data.results
					: [...store.movies, ...data.results.filter((movie: Movie) => !existingIds.has(movie.id))];

			const newStore = {
				...store,
				movies: newMovies,
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
