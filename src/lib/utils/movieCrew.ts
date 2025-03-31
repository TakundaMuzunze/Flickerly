import type { CrewMember } from '$lib/types/crewMember';

export function getDirector(crew: CrewMember[] | undefined): string {
	if (!crew) return 'Director not found';

	const director = crew.find((member) => member.job === 'Director');
	return director ? director.name : 'Director not found';
}
