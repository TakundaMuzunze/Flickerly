import { describe, expect, it } from 'vitest';
import { getDirector } from '.';
import type { CrewMember } from '$lib/types/crewMember';

const crew: CrewMember[] = [
	{ id: 1, name: 'Jane Writer', job: 'Writer' },
	{ id: 2, name: 'Chris Nolan', job: 'Director' },
	{ id: 3, name: 'Alex Producer', job: 'Producer' }
];

describe('getDirector', () => {
	it('returns the director name when present', () => {
		expect(getDirector(crew)).toBe('Chris Nolan');
	});

	it('returns a fallback when crew is undefined', () => {
		expect(getDirector(undefined)).toBe('Director not found');
	});

	it('returns a fallback when no director is in the crew', () => {
		expect(getDirector([{ id: 1, name: 'Sam', job: 'Editor' }])).toBe('Director not found');
	});
});
