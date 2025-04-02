import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

export async function fetchTrending() {
	const response = await fetch(
		`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_KEY}&language=en-US`
	);

	try {
		if (!response.ok) {
			throw new Error('Error! Failed to fetch trending movies.');
		}

		const data = await response.json();

		return processMovieData(data.results);
	} catch (error) {
		console.error('Error! Failed to fetch trending movies. ', error);
		return [];
	}
}
