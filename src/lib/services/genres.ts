import { TMDB_KEY } from '$env/static/private';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

// Fetch genre list
export async function fetchGenres() {
	try {
		const response = await fetch(
			`${TMDB_API_URL}/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch genres');
		}

		const data = await response.json();
		return data.genres;
	} catch (error) {
		console.error('Error fetching genres:', error);
		return [];
	}
} 