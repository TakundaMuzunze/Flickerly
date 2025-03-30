import type Trailer from '$lib/components/TrailerComponent/Trailer.svelte';
import type { Movie } from '$lib/types/movie';

export const movieStore = $state<{
	movies: Movie[];
	selectedMovie: Movie | null;
	trailer: Trailer | null;
}>({
	movies: [],
	selectedMovie: null,
	trailer: null
});
