import { json } from '@sveltejs/kit';
import { TMDB_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function GET({ params, url }: RequestEvent) {
	const genreId = params.id;
	const sortBy = url.searchParams.get('sortBy') || 'popularity.desc';
	const page = url.searchParams.get('page') || '1';

	try {
		const tmdbUrl = `${TMDB_API_URL}/discover/movie?with_genres=${genreId}&sort_by=${sortBy}&api_key=${TMDB_KEY}&page=${page}`;

		const response = await fetch(tmdbUrl);

		const data = await response.json();

		if (!response.ok) {
			throw new Error('Failed to fetch movies');
		}

		const processedResults = processMovieData(data.results);

		return json({
			results: processedResults,
			total_pages: data.total_pages,
			total_results: data.total_results
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Failed to fetch movies' }, { status: 500 });
	}
}
