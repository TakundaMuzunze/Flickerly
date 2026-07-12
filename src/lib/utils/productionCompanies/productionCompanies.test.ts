import { describe, expect, it } from 'vitest';
import { getProductionCompany } from '.';

describe('getProductionCompany', () => {
	it('returns N/A when companies are missing or empty', () => {
		expect(getProductionCompany(undefined)).toBe('N/A');
		expect(getProductionCompany([])).toBe('N/A');
	});

	it('joins company names with commas', () => {
		expect(
			getProductionCompany([{ name: 'A24' }, { name: 'Neon' }, { name: 'Focus Features' }])
		).toBe('A24, Neon, Focus Features');
	});

	it('handles a single company', () => {
		expect(getProductionCompany([{ name: 'Pixar' }])).toBe('Pixar');
	});
});
