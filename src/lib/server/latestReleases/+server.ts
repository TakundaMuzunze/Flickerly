import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

export async function fetchInCinemas() {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1`
		);

		if (!response.ok) {
			throw new Error('Error! - Unable to retrieve movies now in cinema');
		}

		const data = await response.json();

		return processMovieData(data.results);
	} catch (error) {
		console.error('Error! - Unable to retrieve movies now in cinema', error);
		return [];
	}
}
