import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

export async function fetchTopRated() {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`
		);

		if (!response.ok) {
			throw new Error('Error - Failed to fetch latets movies');
		}

		const data = await response.json();

		return processMovieData(data.results.slice(0, 6));
	} catch (error) {
		console.error('Error - Failed to fetch latets movies: ', error);
		return [];
	}
}
