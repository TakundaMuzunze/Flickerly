import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';
import type { Movie } from '$lib/types/movie';

export { GENRES } from '$lib/constants/genres';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export type PaginatedMovies = {
	results: Movie[];
	total_pages: number;
	total_results: number;
};

async function fetchPaginated(url: string): Promise<PaginatedMovies> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch movies');
	}

	const data = await response.json();

	return {
		results: processMovieData(data.results ?? []),
		total_pages: data.total_pages ?? 1,
		total_results: data.total_results ?? 0
	};
}

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
			results.map(async (movie: Movie) => {
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

export async function fetchMoviesByGenre(
	genreId: number,
	page = 1,
	sortBy = 'popularity.desc'
): Promise<PaginatedMovies> {
	try {
		return await fetchPaginated(
			`${TMDB_API_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&language=en-US&sort_by=${sortBy}&page=${page}`
		);
	} catch (error) {
		console.error(`Error fetching movies for genre ${genreId}:`, error);
		throw error;
	}
}

export async function fetchTrending(page = 1): Promise<PaginatedMovies> {
	try {
		return await fetchPaginated(
			`${TMDB_API_URL}/trending/movie/day?api_key=${TMDB_KEY}&language=en-US&page=${page}`
		);
	} catch (error) {
		console.error('Error fetching trending movies:', error);
		throw error;
	}
}

export async function fetchTopRated(page = 1): Promise<PaginatedMovies> {
	try {
		return await fetchPaginated(
			`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=${page}`
		);
	} catch (error) {
		console.error('Error fetching top rated movies:', error);
		throw error;
	}
}

export async function fetchInCinemas(page = 1): Promise<PaginatedMovies> {
	try {
		return await fetchPaginated(
			`${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=${page}`
		);
	} catch (error) {
		console.error('Error fetching in cinemas movies:', error);
		throw error;
	}
}

/** Helper for SSR section previews */
export async function safeMovieResults(promise: Promise<PaginatedMovies>): Promise<Movie[]> {
	try {
		const page = await promise;
		return page.results;
	} catch {
		return [];
	}
}
