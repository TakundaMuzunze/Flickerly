import { searchMovies } from '$lib/server/searchMovies/+server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q') || '';

	if (!query) {
		return {
			movies: [],
			query: ''
		};
	}

	try {
		const movies = await searchMovies(query);
		return {
			movies,
			query
		};
	} catch (error) {
		console.error('Error loading search results:', error);
		return {
			movies: [],
			query,
			error: 'Failed to load search results'
		};
	}
};
