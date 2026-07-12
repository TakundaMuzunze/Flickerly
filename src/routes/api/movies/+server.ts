import { json } from '@sveltejs/kit';
import { fetchTrending, fetchTopRated, fetchInCinemas, fetchMoviesByGenre } from '$lib/services/movies';
import { getGenrePage } from '$lib/constants/genres';

export async function GET({ url }) {
	const searchParams = url.searchParams;
	const type = searchParams.get('type');
	const genre = searchParams.get('genre');
	const page = Number(searchParams.get('page') || '1');
	const sortBy = searchParams.get('sort_by') || 'popularity.desc';

	try {
		let data;

		if (type === 'trending') {
			data = await fetchTrending(page);
		} else if (type === 'top_rated') {
			data = await fetchTopRated(page);
		} else if (type === 'now_playing') {
			data = await fetchInCinemas(page);
		} else if (genre) {
			const genrePage = getGenrePage(genre);
			if (!genrePage) {
				return json({ error: 'Invalid genre' }, { status: 400 });
			}

			data = await fetchMoviesByGenre(genrePage.id, page, sortBy);
		} else {
			return json({ error: 'Missing type or genre parameter' }, { status: 400 });
		}

		return json({
			results: data.results,
			total_pages: data.total_pages,
			total_results: data.total_results
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
