// import { movieStore } from "$lib/stores/movieStore.stores.svelte";
import type { Movie } from '$lib/types/movie';

export function processMovieData(movies: Movie[]) {
	const moviesWithPoster = movies.filter((movie) => movie.poster_path).map(movie => ({
		...movie,
		runtime: movie.runtime || 0,
		genres: movie.genres || [],
		genre_ids: movie.genre_ids || []
	}));

	return moviesWithPoster;
}
