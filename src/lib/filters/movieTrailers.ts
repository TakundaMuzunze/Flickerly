// src/lib/filters/fetchMoviesWithTrailers.ts

import { fetchMovies } from '$lib/server/fetchMovies/+server';
import { fetchTrailer } from '$lib/utils/trailers';

export async function fetchMoviesWithTrailers() {
	const movies = await fetchMovies();

	const moviesWithTrailers = await Promise.all(
		movies.map(async (movie) => {
			const trailer = await fetchTrailer(movie.id);
			return trailer ? { ...movie, trailer } : null; // Only return if trailer exists
		})
	);

	return moviesWithTrailers.filter((movie) => movie !== null);
}
