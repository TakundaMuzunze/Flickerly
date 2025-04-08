import { TMDB_KEY } from '$env/static/private';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function fetchTrending() {
	const [page1, page2, page3] = await Promise.all([
		fetch(`${TMDB_API_URL}/trending/movie/day?api_key=${TMDB_KEY}&language=en-US&page=1`).then(
			(res) => res.json()
		),
		fetch(`${TMDB_API_URL}/trending/movie/day?api_key=${TMDB_KEY}&language=en-US&page=2`).then(
			(res) => res.json()
		),
		fetch(`${TMDB_API_URL}/trending/movie/day?api_key=${TMDB_KEY}&language=en-US&page=3`).then(
			(res) => res.json()
		)
	]);

	return [...page1.results, ...page2.results, ...page3.results];
}
