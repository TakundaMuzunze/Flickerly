import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';
import { fuzzySearchMovies } from '$lib/utils/fuzzySearch';
import type { Movie } from '$lib/types/movie';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

interface TMDBResponse {
	results: Movie[];
}

// Cache for movie pool
let moviePoolCache: Movie[] | null = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchMoviesByQuery(query: string): Promise<Movie[]> {
	try {
		const response = await fetch(
			`${TMDB_API_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
		);

		if (!response.ok) {
			throw new Error(`TMDB API error: ${response.status}`);
		}

		const data: TMDBResponse = await response.json();
		return processMovieData(data.results);
	} catch (error) {
		console.error('Error in fetchMoviesByQuery:', error);
		return [];
	}
}

async function fetchMoviePool(): Promise<Movie[]> {
	const now = Date.now();
	if (moviePoolCache && now - lastCacheUpdate < CACHE_DURATION) {
		return moviePoolCache;
	}

	try {
		const pages = [1, 2, 3, 4, 5];
		const responses = await Promise.all(
			pages.map((page) =>
				fetch(`${TMDB_API_URL}/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`).then(
					(res) => res.json()
				)
			)
		);

		// Combine and deduplicate movies
		const allMovies = responses.flatMap((response: TMDBResponse) => response.results);
		const uniqueMovies = Array.from(new Map(allMovies.map((movie) => [movie.id, movie])).values());

		// Update cache
		moviePoolCache = uniqueMovies;
		lastCacheUpdate = now;

		return uniqueMovies;
	} catch (error) {
		console.error('Error in fetchMoviePool:', error);
		return [];
	}
}

export async function searchMovies(query: string): Promise<Movie[]> {
	if (!query.trim()) {
		return [];
	}

	try {
		// First try exact search
		const exactMatches = await fetchMoviesByQuery(query);
		
		if (exactMatches.length > 0) {
			return exactMatches;
		}

		// If no exact matches, try fuzzy search
		const moviePool = await fetchMoviePool();
		const processedMovies = processMovieData(moviePool);
		return fuzzySearchMovies(processedMovies, query);
	} catch (error) {
		console.error('Error in searchMovies:', error);
		return [];
	}
}
