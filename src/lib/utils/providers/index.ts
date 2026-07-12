import { TMDB_KEY } from '$env/static/private';

export async function fetchProviders(movieId: number) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMDB_KEY}`
	);

	try {
		if (!response.ok) {
			throw new Error('Error! Failed to fetch streaming providers.');
		}

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.error('Error! Failed to fetch streaming providers. ', error);
		return [];
	}
}
