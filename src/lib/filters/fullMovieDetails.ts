import { fetchProviders } from '$lib/utils/providers';
import { fetchTrailer } from '$lib/utils/trailers';
import { TMDB_KEY } from '$env/static/private';
import type { Movie } from '$lib/types/movie';

export async function fetchFullMovieDetails(movie: Movie) {
	if (!movie) {
		return null;
	}

	const movieId = movie.id;

	const trailer = await fetchTrailer(movieId);
	const providers = await fetchProviders(movieId);

	// Get the full movie details from TMDB
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US&append_to_response=credits`
	);
	const fullDetails = await response.json();

	// Create a new object with all the movie data
	const movieWithDetails = {
		...movie,
		...fullDetails,
		trailer,
		providers
	};

	return movieWithDetails;
}
