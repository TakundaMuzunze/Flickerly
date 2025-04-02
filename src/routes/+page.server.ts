import { fetchTrending } from '$lib/server/trendingMovies/+server';
import { fetchTopRated } from '$lib/server/topRated/+server';
import { fetchFullMovieDetails } from '$lib/filters/fullMovieDetails';
import { fetchMovies } from '$lib/server/fetchMovies/+server';
import { fetchInCinemas } from '$lib/server/latestReleases/+server';

export async function load() {
	// Fetch base popular movies for the carousel
	const popularMovies = await fetchMovies();

	// Fetch full details (trailer + providers) for each movie
	const carouselMovies = await Promise.all(
		popularMovies.map(async (movie) => {
			const fullDetails = await fetchFullMovieDetails(movie);
			return fullDetails;
		})
	);

	const [trendingMovies, topRatedMovies, inCinemasMovies] = await Promise.all([
		fetchTrending(),
		fetchTopRated(),
		fetchInCinemas()
	]);

	const finalMovies = carouselMovies.filter(Boolean);

	return {
		movies: finalMovies,
		trendingMovies,
		topRatedMovies,
		inCinemasMovies
	};
}
