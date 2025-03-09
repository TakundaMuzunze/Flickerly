import { fetchMovies, fetchProviders } from '$lib/server/fetchMovies/+server';
import { fetchTopRated } from '$lib/server/topRated/+server';
import { fetchTrending } from '$lib/server/trendingMovies/+server';

export async function load() {
	const [movies, trendingMovies, topRatedMovies] = await Promise.all([
		fetchMovies(),
		fetchTrending(),
		fetchTopRated()
	]);

	// console.log('Top Rated Movies:', topRatedMovies);

	const moviesWithProviders = await Promise.all(
		movies.map(async (movie) => {
			const providers = await fetchProviders(movie.id);
			return { ...movie, providers };
		})
	);

	return {
		movies: moviesWithProviders,
		trendingMovies,
		topRatedMovies
	};
}
