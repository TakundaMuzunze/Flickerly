import { json } from '@sveltejs/kit';
import { fetchTrending, fetchTopRated, fetchInCinemas, fetchMoviesByGenre } from '$lib/services/movies';
import { getGenrePage } from '$lib/constants/genres';

export async function GET({ url }) {
	const searchParams = url.searchParams;
	const type = searchParams.get('type');
	const genre = searchParams.get('genre');
	const page = searchParams.get('page') || '1';

	try {
		let movies;

		if (type === 'trending') {
			movies = await fetchTrending();
		} else if (type === 'top_rated') {
			movies = await fetchTopRated();
		} else if (type === 'now_playing') {
			movies = await fetchInCinemas();
		} else if (genre) {
			const genrePage = getGenrePage(genre);
			if (!genrePage) {
				return json({ error: 'Invalid genre' }, { status: 400 });
			}

			movies = await fetchMoviesByGenre(genrePage.id);
		} else {
			return json({ error: 'Missing type or genre parameter' }, { status: 400 });
		}

		return json({
			results: movies,
			total_pages: 1,
			total_results: movies.length
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
