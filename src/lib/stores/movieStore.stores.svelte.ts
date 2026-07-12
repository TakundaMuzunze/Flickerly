import type Trailer from '$lib/components/features/TrailerComponent/Trailer.svelte';
import type { Movie } from '$lib/types/movie';
import { writable, get } from 'svelte/store';

export type SortOptionKey = 'popularity' | 'rating' | 'release_desc' | 'release_asc';

type MovieStoreState = {
	movies: Movie[];
	selectedMovie: Movie | null;
	trailer: Trailer | null;
	sortBy: SortOptionKey;
	currentGenreId: string | null;
	currentPage: number;
	totalPages: number;
	isLoading: boolean;
	isLoadingMore: boolean;
	error: string | null;
};

const initialState: MovieStoreState = {
	movies: [],
	selectedMovie: null,
	trailer: null,
	sortBy: 'popularity',
	currentGenreId: null,
	currentPage: 1,
	totalPages: 1,
	isLoading: false,
	isLoadingMore: false,
	error: null
};

export const movieStore = writable<MovieStoreState>(initialState);

const sortOptions: Record<SortOptionKey, string> = {
	popularity: 'popularity.desc',
	rating: 'vote_average.desc',
	release_desc: 'release_date.desc',
	release_asc: 'release_date.asc'
};

export function resetStore() {
	movieStore.set(initialState);
}

function dedupeMovies(movies: Movie[]): Movie[] {
	const seen = new Set<number>();
	return movies.filter((movie) => {
		if (seen.has(movie.id)) return false;
		seen.add(movie.id);
		return true;
	});
}

export async function fetchMovies(genreId: string, sortOptionKey: SortOptionKey, page: number = 1) {
	const sortValue = sortOptions[sortOptionKey];
	if (!sortValue) {
		console.error('Invalid sort option key:', sortOptionKey);
		throw new Error('Invalid sort option');
	}

	const isFirstPage = page === 1;

	movieStore.update((store) => ({
		...store,
		error: null,
		isLoading: isFirstPage,
		isLoadingMore: !isFirstPage
	}));

	let url: string;
	if (genreId === 'trending') {
		url = `/api/movies?type=trending&page=${page}`;
	} else if (genreId === 'top_rated') {
		url = `/api/movies?type=top_rated&page=${page}`;
	} else if (genreId === 'now_playing') {
		url = `/api/movies?type=now_playing&page=${page}`;
	} else {
		url = `/api/movies?genre=${genreId}&page=${page}&sort_by=${sortValue}`;
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
			const existingIds = new Set(store.movies.map((movie) => movie.id));
			const incoming = data.results.filter((movie: Movie) => !existingIds.has(movie.id));
			const newMovies = isFirstPage ? dedupeMovies(data.results) : [...store.movies, ...incoming];

			return {
				...store,
				movies: newMovies,
				sortBy: sortOptionKey,
				currentGenreId: genreId,
				currentPage: page,
				totalPages: data.total_pages,
				isLoading: false,
				isLoadingMore: false,
				error: null
			};
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Failed to load movies';
		movieStore.update((store) => ({
			...store,
			isLoading: false,
			isLoadingMore: false,
			error: isFirstPage ? message : store.error
		}));
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

export async function retryFetch(): Promise<void> {
	const store = get(movieStore);
	if (store.currentGenreId) {
		await fetchMovies(store.currentGenreId, store.sortBy, 1);
	}
}

export function setMovies(movies: Movie[]): void {
	movieStore.update((store) => ({
		...store,
		movies
	}));
}
