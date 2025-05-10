import { json } from '@sveltejs/kit';
import { TMDB_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function GET({ url }: RequestEvent) {
	const page = url.searchParams.get('page') || '1';

	try {
		const tmdbUrl = `${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_KEY}&page=${page}`;

		const response = await fetch(tmdbUrl);

		const data = await response.json();

		if (!response.ok) {
			throw new Error('Failed to fetch now playing movies');
		}

		const processedResults = processMovieData(data.results);

		return json({
			results: processedResults,
			total_pages: data.total_pages,
			total_results: data.total_results
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Failed to fetch now playing movies' }, { status: 500 });
	}
} 