import { beforeEach, describe, expect, it } from 'vitest';
import { clearImageCache, hasImageLoaded, markImageAsLoaded } from '.';

describe('imageCaching', () => {
	beforeEach(() => {
		clearImageCache();
	});

	it('tracks loaded image urls', () => {
		expect(hasImageLoaded('/img/a.jpg')).toBe(false);

		markImageAsLoaded('/img/a.jpg');

		expect(hasImageLoaded('/img/a.jpg')).toBe(true);
		expect(hasImageLoaded('/img/b.jpg')).toBe(false);
	});

	it('clears the cache', () => {
		markImageAsLoaded('/img/a.jpg');
		clearImageCache();

		expect(hasImageLoaded('/img/a.jpg')).toBe(false);
	});
});
