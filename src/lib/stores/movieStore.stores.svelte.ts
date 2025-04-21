import type Trailer from '$lib/components/TrailerComponent/Trailer.svelte';
import type { Movie } from '$lib/types/movie';
import { writable, get } from 'svelte/store';

console.log('Environment variables:', import.meta.env);
const TMDB_API_KEY = import.meta.env.TMDB_KEY;

export const movieStore = writable<{
	movies: Movie[];
	selectedMovie: Movie | null;
	trailer: Trailer | null;
	sortBy: 'popularity' | 'rating' | 'release_desc' | 'release_asc';
	currentGenreId: string | null;
}>({
	movies: [],
	selectedMovie: null,
	trailer: null,
	sortBy: 'popularity',
	currentGenreId: null
});

type SortOptionKey = 'popularity' | 'rating' | 'release_desc' | 'release_asc';

const sortOptions: Record<SortOptionKey, string> = {
	popularity: 'popularity.desc',
	rating: 'vote_average.desc',
	release_desc: 'release_date.desc',
	release_asc: 'release_date.asc'
};

export async function fetchMovies(genreId: string, sortOptionKey: SortOptionKey) {
	const sortValue = sortOptions[sortOptionKey];
	const url = `/api/genre/${genreId}?sortBy=${sortValue}`;

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
			return {
				...store,
				movies: data.results,
				sortBy: sortOptionKey,
				currentGenreId: genreId
			};
		});
	} catch (error) {
		console.error('Error fetching movies:', error);
		throw error;
	}
}

export async function sortMovies(sortBy: SortOptionKey): Promise<void> {
	const store = get(movieStore);
	if (store.currentGenreId) {
		await fetchMovies(store.currentGenreId, sortBy);
	}
}

export function setMovies(movies: Movie[]): void {
	movieStore.update((store) => ({
		...store,
		movies
	}));
}
