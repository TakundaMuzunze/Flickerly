import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function fetchRomanceMovies() {
	const [page1, page2, page3] = await Promise.all([
		fetch(
			`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=10749&language=en-US&sort_by=popularity.desc&page=1`
		).then((res) => res.json()),
		fetch(
			`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=10749&language=en-US&sort_by=popularity.desc&page=2`
		).then((res) => res.json()),
		fetch(
			`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=10749&language=en-US&sort_by=popularity.desc&page=3`
		).then((res) => res.json())
	]);

	const results = [...page1.results, ...page2.results, ...page3.results];

	return processMovieData(results);
}
