import { fetchPopularMovies } from '$lib/services/movies';
import { fetchProviders } from '$lib/utils/providers';

export async function fetchMoviesWithProviders() {
	const movies = await fetchPopularMovies();

	const moviesWithProviders = await Promise.all(
		movies.map(async (movie) => {
			const providers = await fetchProviders(movie.id);
			return { ...movie, providers };
		})
	);

	return moviesWithProviders;
}
