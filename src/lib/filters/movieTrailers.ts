import { fetchPopularMovies } from '$lib/services/movies';
import { fetchTrailer } from '$lib/utils/trailers';

export async function fetchMoviesWithTrailers() {
	const movies = await fetchPopularMovies();

	const moviesWithTrailers = await Promise.all(
		movies.map(async (movie) => {
			const trailer = await fetchTrailer(movie.id);
			return trailer ? { ...movie, trailer } : null;
		})
	);

	return moviesWithTrailers.filter((movie) => movie !== null);
}
