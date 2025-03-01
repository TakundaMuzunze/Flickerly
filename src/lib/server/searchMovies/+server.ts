import { TMDB_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query') || '';

	if (!query.trim()) {
		return json({ results: [] });
	}
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`
		);

		if (!response.ok) {
			throw new Error('Error! Failed to fetch movies');
		}

		const data = await response.json();

		return json({ results: data.results || [] });
	} catch (error) {
		console.error('Error! - No movie results found', error);
		return json({ results: [] });
	}
};
