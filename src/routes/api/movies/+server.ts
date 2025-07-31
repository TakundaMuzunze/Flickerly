import { json } from '@sveltejs/kit';
import { fetchTrending, fetchTopRated, fetchInCinemas, fetchMoviesByGenre, GENRES } from '$lib/services/movies';

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
			const genreMap: Record<string, number> = {
				'action': GENRES.action,
				'comedy': GENRES.comedy,
				'drama': GENRES.drama,
				'fantasy': GENRES.fantasy,
				'horror': GENRES.horror,
				'romance': GENRES.romance,
				'scifi': GENRES.scifi,
				'thriller': GENRES.thriller
			};
			
			const genreId = genreMap[genre];
			if (!genreId) {
				return json({ error: 'Invalid genre' }, { status: 400 });
			}
			
			movies = await fetchMoviesByGenre(genreId);
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