import { fetchMovies } from '$lib/server/fetchMovies/+server';
import { fetchTopRated } from '$lib/server/topRated/+server';
import { fetchTrending } from '$lib/server/trendingMovies/+server';
import { fetchUpcoming } from '$lib/server/upcomingMovies/+sever';
import { fetchProviders } from '$lib/utils/providers';

export async function load() {
	const [movies, trendingMovies, topRatedMovies, upcomingMovies] = await Promise.all([
		fetchMovies(),
		fetchTrending(),
		fetchTopRated(),
		fetchUpcoming()
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
		topRatedMovies,
		upcomingMovies
	};
}
