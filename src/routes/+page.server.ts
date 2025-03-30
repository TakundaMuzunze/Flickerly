import { fetchMoviesWithProviders } from '$lib/filters/movieProviders';
import { fetchMoviesWithTrailers } from '$lib/filters/movieTrailers';

import { fetchTopRated } from '$lib/server/topRated/+server';
import { fetchTrending } from '$lib/server/trendingMovies/+server';
import { fetchUpcoming } from '$lib/server/upcomingMovies/+server';

export async function load() {
	const [moviesWithTrailers, moviesWithProviders, trendingMovies, topRatedMovies, upcomingMovies] =
		await Promise.all([
			fetchMoviesWithTrailers(),
			fetchMoviesWithProviders(),
			fetchTrending(),
			fetchTopRated(),
			fetchUpcoming()
		]);

	const movies = moviesWithTrailers.map((movie) => {
		const matchingMovie = moviesWithProviders.find((m) => m.id === movie.id);
		return {
			...movie,
			providers: matchingMovie?.providers ?? []
		};
	});

	return {
		movies,
		trendingMovies,
		topRatedMovies,
		upcomingMovies
	};
}
