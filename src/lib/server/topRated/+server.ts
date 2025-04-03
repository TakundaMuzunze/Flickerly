import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function fetchTopRated() {
	try {
		// Fetch multiple pages
		const [page1, page2, page3] = await Promise.all([
			fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`).then(res => res.json()),
			fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=2`).then(res => res.json()),
			fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=3`).then(res => res.json())
		]);
		
		// Combine results from all pages
		const results = [...page1.results, ...page2.results, ...page3.results];

		return processMovieData(results);
	} catch (error) {
		console.error('Error - Failed to fetch latets movies: ', error);
		return [];
	}
}
