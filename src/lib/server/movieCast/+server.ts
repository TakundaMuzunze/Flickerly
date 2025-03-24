import { TMDB_KEY } from '$env/static/private';

export async function fetchCast(movieId: number) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_KEY}`
		);

		if (!response.ok) {
			throw new Error('Error! - Unable to retrieve cast for this movie.');
		}

		const data = await response.json();

		return data.cast;
	} catch (error) {
		console.error('Error! - Nable to retrieve cast for this movie.', error);
		return [];
	}
}
