import { TMDB_KEY } from '$env/static/private';

export async function fetchMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
	);

	try {
		if (!response.ok) {
			throw new Error('Error! Failed to fetch movies.');
		}

		const data = await response.json();

		console.log('data: ', data);
		return data.results;
	} catch (error) {
		console.error('Error! Failed to fetch movies. ', error);
		return [];
	}
}

export async function fetchProviders(movieId: number) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${TMDB_KEY}`
	);

	try {
		if (!response.ok) {
			throw new Error('Error! Failed to fetch streaming providers.');
		}

		const data = await response.json();

		console.log('providers: ', data.results);
		return data.results;
	} catch (error) {
		console.error('Error! Failed to fetch streaming providers. ', error);
		return [];
	}
}
