import { fetchFullMovieDetails } from '$lib/filters/fullMovieDetails';
import { fetchPopularMovies, fetchTrending, fetchTopRated, fetchInCinemas, fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const popularMovies = await fetchPopularMovies();

	// Fetch full details (trailer + providers) for each movie
	const carouselMovies = await Promise.all(
		popularMovies.map(async (movie) => {
			const fullDetails = await fetchFullMovieDetails(movie);
			return fullDetails;
		})
	);

	const [
		trendingMovies,
		topRatedMovies,
		inCinemasMovies,
		actionMovies,
		comedyMovies,
		thrillerMovies
	] = await Promise.all([
		fetchTrending(),
		fetchTopRated(),
		fetchInCinemas(),
		fetchMoviesByGenre(GENRES.action),
		fetchMoviesByGenre(GENRES.comedy),
		fetchMoviesByGenre(GENRES.thriller)
	]);

	const finalMovies = carouselMovies.filter(Boolean);

	return {
		movies: finalMovies,
		trendingMovies,
		topRatedMovies,
		inCinemasMovies,
		actionMovies,
		comedyMovies,
		thrillerMovies
	};
}
