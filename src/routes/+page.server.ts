import { fetchFullMovieDetails } from '$lib/filters/fullMovieDetails';
import {
	fetchPopularMovies,
	fetchTrending,
	fetchTopRated,
	fetchInCinemas,
	fetchMoviesByGenre,
	safeMovieResults,
	GENRES
} from '$lib/services/movies';

export async function load() {
	const popularMovies = await fetchPopularMovies();

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
		safeMovieResults(fetchTrending()),
		safeMovieResults(fetchTopRated()),
		safeMovieResults(fetchInCinemas()),
		safeMovieResults(fetchMoviesByGenre(GENRES.action)),
		safeMovieResults(fetchMoviesByGenre(GENRES.comedy)),
		safeMovieResults(fetchMoviesByGenre(GENRES.thriller))
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
