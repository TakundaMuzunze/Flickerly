import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

export async function fetchMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
	);

	try {
		if (!response.ok) {
			throw new Error('Error! Failed to fetch movies.');
		}

		const data = await response.json();

		return processMovieData(data.results);
	} catch (error) {
		console.error('Error! Failed to fetch movies. ', error);
		return [];
	}
}
