import { fetchMovies } from '$lib/server/fetchMovies/+server';
import { fetchProviders } from '$lib/utils/providers';

export async function fetchMoviesWithProviders() {
	const movies = await fetchMovies();

	const moviesWithProviders = await Promise.all(
		movies.map(async (movie) => {
			const providers = await fetchProviders(movie.id);
			return { ...movie, providers };
		})
	);

	return moviesWithProviders;
}
