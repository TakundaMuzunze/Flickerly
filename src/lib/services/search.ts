import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string) {
	try {
		if (!query.trim()) return [];

		const response = await fetch(
			`${TMDB_API_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
		);

		if (!response.ok) {
			throw new Error('Search request failed');
		}

		const data = await response.json();
		return processMovieData(data.results);
	} catch (error) {
		console.error('Error searching movies:', error);
		return [];
	}
}

export async function fetchSimilarMovies(movieId: number) {
	try {
		const [page1, page2, page3] = await Promise.all([
			fetch(
				`${TMDB_API_URL}/movie/${movieId}/similar?api_key=${TMDB_KEY}&language=en-US&page=1`
			).then((res) => res.json()),
			fetch(
				`${TMDB_API_URL}/movie/${movieId}/similar?api_key=${TMDB_KEY}&language=en-US&page=2`
			).then((res) => res.json()),
			fetch(
				`${TMDB_API_URL}/movie/${movieId}/similar?api_key=${TMDB_KEY}&language=en-US&page=3`
			).then((res) => res.json())
		]);

		const fullResults = [...page1.results, ...page2.results, ...page3.results];
		return processMovieData(fullResults);
	} catch (error) {
		console.error('Error fetching similar movies:', error);
		return [];
	}
}
