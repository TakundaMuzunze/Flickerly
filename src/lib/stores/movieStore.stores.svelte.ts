import type { Movie } from '$lib/types/movie';

export const movieStore = $state<{
	movies: Movie[];
	selectedMovie: Movie | null;
}>({
	movies: [],
	selectedMovie: null
});
