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
	const response = await fetch(
		`${TMDB_API_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch search results');
	}

	const data: TMDBResponse = await response.json();
	return data.results;
}

async function fetchMoviePool(): Promise<Movie[]> {
	const now = Date.now();
	if (moviePoolCache && now - lastCacheUpdate < CACHE_DURATION) {
		return moviePoolCache;
	}

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
}

export async function searchMovies(query: string): Promise<Movie[]> {
	try {
		// First try exact search
		const exactMatches = await fetchMoviesByQuery(query);

		if (exactMatches.length > 0) {
			return processMovieData(exactMatches);
		}

		// If no exact matches, get movie pool and try fuzzy search
		const moviePool = await fetchMoviePool();

		const processedMovies = processMovieData(moviePool);
		const fuzzyResults = fuzzySearchMovies(processedMovies, query);

		return fuzzyResults;
	} catch (error) {
		console.error('Error searching movies:', error);
		throw error;
	}
}
