import { TMDB_KEY } from '$env/static/private';

export async function fetchTopRated() {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`
		);

		if (!response.ok) {
			throw new Error('Error - Failed to fetch latets movies');
		}

		const data = await response.json();

		return data.results.slice(0, 4);
	} catch (error) {
		console.error('Error - Failed to fetch latets movies: ', error);
		return [];
	}
}
