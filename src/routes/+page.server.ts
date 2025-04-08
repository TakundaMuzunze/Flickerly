import { fetchTrending } from '$lib/server/trendingMovies/+server';
import { fetchTopRated } from '$lib/server/topRated/+server';
import { fetchFullMovieDetails } from '$lib/filters/fullMovieDetails';
import { fetchMovies } from '$lib/server/fetchMovies/+server';
import { fetchInCinemas } from '$lib/server/latestReleases/+server';
import { fetchActionMovies } from '$lib/server/actionMovies/+server';
import { fetchComedyMovies } from '$lib/server/comedyMovies/+server';
import { fetchThrillerMovies } from '$lib/server/thrillerMovies/+server';

export async function load() {
	const popularMovies = await fetchMovies();

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
		fetchActionMovies(),
		fetchComedyMovies(),
		fetchThrillerMovies()
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
