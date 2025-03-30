import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

export async function fetchUpcoming() {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}`);

		if (!response.ok) {
			throw new Error('Error - Failed to retrieve upcoming releases');
		}

		const data = await response.json();

		const currentYear = new Date().getFullYear();

		const filteredMovies = data.results.filter((movie) =>
			movie.release_date?.startsWith(currentYear.toString())
		);

		return processMovieData(filteredMovies.slice(0, 6));
	} catch (error) {
		console.error('Error - Failed to retrieve upcoming releases', error);
		return [];
	}
}
