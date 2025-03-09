import { fetchMovies, fetchProviders } from '$lib/server/fetchMovies/+server';
import { fetchTrending } from '$lib/server/trendingMovies/+server';

export async function load() {
	const [movies, trendingMovies] = await Promise.all([fetchMovies(), fetchTrending()]);

	const moviesWithProviders = await Promise.all(
		movies.map(async (movie) => {
			const providers = await fetchProviders(movie.id);
			return { ...movie, providers };
		})
	);

	return { movies: moviesWithProviders, trendingMovies };
}
