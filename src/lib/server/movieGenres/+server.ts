import { TMDB_KEY } from '$env/static/private';

export async function getGenre() {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`
		);

		if (!response.ok) {
			throw new Error('Error - Failed to retrieve movie genres.');
		}

		const data = await response.json();

		return data.genres;
	} catch (error) {
		console.error('Error - Failed to retrieve movie genres: ', error);
		return [];
	}
}
