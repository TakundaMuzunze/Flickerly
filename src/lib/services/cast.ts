import { TMDB_KEY } from '$env/static/private';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function fetchCast(movieId: number) {
	try {
		const response = await fetch(`${TMDB_API_URL}/movie/${movieId}/credits?api_key=${TMDB_KEY}`);

		if (!response.ok) {
			throw new Error('Failed to fetch cast');
		}

		const data = await response.json();
		return data.cast;
	} catch (error) {
		console.error('Error fetching cast:', error);
		return [];
	}
}
