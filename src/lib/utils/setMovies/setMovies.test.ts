import { describe, expect, it } from 'vitest';
import { processMovieData } from '.';
import type { Movie } from '$lib/types/movie';

function makeMovie(overrides: Partial<Movie> & Pick<Movie, 'id'>): Movie {
	return {
		title: `Movie ${overrides.id}`,
		overview: 'An overview',
		poster_path: `/poster${overrides.id}.jpg`,
		backdrop_path: `/backdrop${overrides.id}.jpg`,
		...overrides
	};
}

describe('processMovieData', () => {
	it('adds image urls and default fields', () => {
		const [movie] = processMovieData([
			makeMovie({ id: 1, runtime: undefined, genres: undefined, genre_ids: undefined })
		]);

		expect(movie.runtime).toBe(0);
		expect(movie.genres).toEqual([]);
		expect(movie.genre_ids).toEqual([]);
		expect(movie.posterUrl).toBe('https://image.tmdb.org/t/p/w342/poster1.jpg');
		expect(movie.backdropUrl).toBe('https://image.tmdb.org/t/p/w780/backdrop1.jpg');
	});

	it('filters out movies without a poster', () => {
		const result = processMovieData([
			makeMovie({ id: 1, poster_path: '' }),
			makeMovie({ id: 2, poster_path: '/keep.jpg' })
		]);

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe(2);
	});

	it('deduplicates movies by id, keeping the first', () => {
		const result = processMovieData([
			makeMovie({ id: 10, title: 'First' }),
			makeMovie({ id: 10, title: 'Duplicate' }),
			makeMovie({ id: 11, title: 'Unique' })
		]);

		expect(result).toHaveLength(2);
		expect(result.map((movie) => movie.title)).toEqual(['First', 'Unique']);
	});

	it('sets backdropUrl to null when backdrop_path is missing', () => {
		const [movie] = processMovieData([makeMovie({ id: 3, backdrop_path: '' })]);

		expect(movie.backdropUrl).toBeNull();
	});
});
