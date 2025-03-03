import { fetchMovies, fetchProviders } from '$lib/server/fetchMovies/+server';

export async function load() {
	const movies = await fetchMovies();
	// Fetch watch providers for each movie
	const moviesWithProviders = await Promise.all(
		movies.map(async (movie) => {
			const providers = await fetchProviders(movie.id);
			return { ...movie, providers };
		})
	);

	return { movies: moviesWithProviders };
}
