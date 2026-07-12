import { describe, expect, it } from 'vitest';
import { GENRES, GENRE_SLUGS, getGenrePage } from '$lib/constants/genres';

describe('getGenrePage', () => {
	it('returns genre config for a valid slug', () => {
		expect(getGenrePage('action')).toEqual({
			slug: 'action',
			id: 28,
			title: 'Action Movies',
			subtitleKey: 'action'
		});
	});

	it('returns science-fiction config', () => {
		expect(getGenrePage('science-fiction')).toMatchObject({
			slug: 'science-fiction',
			id: 878,
			subtitleKey: 'scifi'
		});
	});

	it('returns null for an unknown slug', () => {
		expect(getGenrePage('western')).toBeNull();
		expect(getGenrePage('scifi')).toBeNull();
	});
});

describe('genre constants', () => {
	it('exposes all genre slugs', () => {
		expect(GENRE_SLUGS).toContain('action');
		expect(GENRE_SLUGS).toContain('science-fiction');
		expect(GENRE_SLUGS).toHaveLength(8);
	});

	it('keeps GENRES ids aligned with GENRE_PAGES', () => {
		expect(GENRES.action).toBe(28);
		expect(GENRES.scifi).toBe(878);
		expect(GENRES.romance).toBe(10749);
	});
});
