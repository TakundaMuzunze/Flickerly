import type { Movie } from '$lib/types/movie';

export function processMovieData(movies: Movie[]) {
	const moviesWithPoster = movies
		.filter((movie) => movie.poster_path)
		.map((movie) => ({
			...movie,
			runtime: movie.runtime || 0,
			genres: movie.genres || [],
			genre_ids: movie.genre_ids || [],
			posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : null,
			backdropUrl: movie.backdrop_path
				? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
				: null
		}));

	return moviesWithPoster;
}
