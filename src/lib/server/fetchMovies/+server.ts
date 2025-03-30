import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';
import type { Movie } from '$lib/types/movie';

interface TMDBMovieResponse {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	runtime: number;
	genres: Array<{ id: number; name: string }>;
	genre_ids: number[];
}

interface TMDBPopularResponse {
	results: TMDBMovieResponse[];
}

export async function fetchMovies(): Promise<Movie[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch popular movies');
		}

		const data = (await response.json()) as TMDBPopularResponse;
		const { results } = data;

		// Fetch full details for each movie to get runtime and genres
		const moviesWithDetails = await Promise.all(
			results.map(async (movie: TMDBMovieResponse) => {
				const detailsResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_KEY}&language=en-US`
				);
				const details = (await detailsResponse.json()) as TMDBMovieResponse;
				return { ...movie, ...details };
			})
		);

		return processMovieData(moviesWithDetails);
	} catch (error) {
		console.error('Error fetching movies:', error);
		return [];
	}
}
