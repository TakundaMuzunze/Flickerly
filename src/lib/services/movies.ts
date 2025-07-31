import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';
import type { Movie } from '$lib/types/movie';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export const GENRES = {
	action: 28,
	comedy: 35,
	drama: 18,
	fantasy: 14,
	horror: 27,
	romance: 10749,
	scifi: 878,
	thriller: 53
} as const;

export async function fetchPopularMovies(): Promise<Movie[]> {
	try {
		const response = await fetch(
			`${TMDB_API_URL}/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch popular movies');
		}

		const data = await response.json();
		const { results } = data;

		const moviesWithDetails = await Promise.all(
			results.map(async (movie: any) => {
				const detailsResponse = await fetch(
					`${TMDB_API_URL}/movie/${movie.id}?api_key=${TMDB_KEY}&language=en-US`
				);

				const details = await detailsResponse.json();

				return { ...movie, ...details };
			})
		);

		return processMovieData(moviesWithDetails);
	} catch (error) {
		console.error('Error fetching popular movies:', error);
		return [];
	}
}

export async function fetchMoviesByGenre(genreId: number) {
	try {
		const [page1, page2, page3] = await Promise.all([
			fetch(
				`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=1`
			).then((res) => res.json()),
			fetch(
				`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=2`
			).then((res) => res.json()),
			fetch(
				`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=3`
			).then((res) => res.json())
		]);

		const results = [...page1.results, ...page2.results, ...page3.results];
		return processMovieData(results);
	} catch (error) {
		console.error(`Error fetching movies for genre ${genreId}:`, error);
		return [];
	}
}

export async function fetchTrending() {
	try {
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

		const results = [...page1.results, ...page2.results, ...page3.results];
		return processMovieData(results);
	} catch (error) {
		console.error('Error fetching trending movies:', error);
		return [];
	}
}

export async function fetchTopRated() {
	try {
		const [page1, page2, page3] = await Promise.all([
			fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`).then(
				(res) => res.json()
			),
			fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=2`).then(
				(res) => res.json()
			),
			fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=3`).then(
				(res) => res.json()
			)
		]);

		const results = [...page1.results, ...page2.results, ...page3.results];
		return processMovieData(results);
	} catch (error) {
		console.error('Error fetching top rated movies:', error);
		return [];
	}
}

export async function fetchInCinemas() {
	try {
		const [page1, page2, page3] = await Promise.all([
			fetch(`${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1`).then(
				(res) => res.json()
			),
			fetch(`${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=2`).then(
				(res) => res.json()
			),
			fetch(`${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=3`).then(
				(res) => res.json()
			)
		]);

		const results = [...page1.results, ...page2.results, ...page3.results];
		return processMovieData(results);
	} catch (error) {
		console.error('Error fetching in cinemas movies:', error);
		return [];
	}
}
