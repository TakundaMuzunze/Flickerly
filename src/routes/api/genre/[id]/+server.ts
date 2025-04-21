import { json } from '@sveltejs/kit';
import { TMDB_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function GET({ params, url }: RequestEvent) {
	const genreId = params.id;
	const sortBy = url.searchParams.get('sortBy') || 'popularity.desc';

	try {
		const [page1, page2, page3] = await Promise.all([
			fetch(
				`${TMDB_API_URL}/discover/movie?with_genres=${genreId}&sort_by=${sortBy}&api_key=${TMDB_KEY}&page=1`
			).then((res) => res.json()),
			fetch(
				`${TMDB_API_URL}/discover/movie?with_genres=${genreId}&sort_by=${sortBy}&api_key=${TMDB_KEY}&page=2`
			).then((res) => res.json()),
			fetch(
				`${TMDB_API_URL}/discover/movie?with_genres=${genreId}&sort_by=${sortBy}&api_key=${TMDB_KEY}&page=3`
			).then((res) => res.json())
		]);

		const allResults = [...page1.results, ...page2.results, ...page3.results];
		const uniqueResults = Array.from(
			new Map(allResults.map((movie) => [movie.id, movie])).values()
		);

		const processedResults = processMovieData(uniqueResults);

		return json({ results: processedResults });
	} catch (error) {
		return json({ error: 'Failed to fetch movies' }, { status: 500 });
	}
}
