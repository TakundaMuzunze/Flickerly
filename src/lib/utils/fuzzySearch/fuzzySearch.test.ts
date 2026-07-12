import { describe, expect, it } from 'vitest';
import { fuzzySearchMovies } from '.';

const movies = [
	{
		id: 1,
		title: 'Inception',
		overview: 'A thief who steals corporate secrets through dream-sharing technology.'
	},
	{
		id: 2,
		title: 'The Dark Knight',
		overview: 'Batman faces the Joker in Gotham City.'
	},
	{
		id: 3,
		title: 'Interstellar',
		overview: 'Explorers travel through a wormhole in space.'
	}
];

describe('fuzzySearchMovies', () => {
	it('finds movies by title', () => {
		const results = fuzzySearchMovies(movies, 'inception');

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].title).toBe('Inception');
	});

	it('is case insensitive', () => {
		const results = fuzzySearchMovies(movies, 'DARK knight');

		expect(results.some((movie) => movie.title === 'The Dark Knight')).toBe(true);
	});

	it('returns an empty array for unrelated queries', () => {
		expect(fuzzySearchMovies(movies, 'zzzznotamovie')).toEqual([]);
	});

	it('trims whitespace from the query', () => {
		const results = fuzzySearchMovies(movies, '  Interstellar  ');

		expect(results.some((movie) => movie.title === 'Interstellar')).toBe(true);
	});
});
