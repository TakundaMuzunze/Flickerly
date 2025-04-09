import type { PageServerLoad } from './$types';

import { fetchSimilarMovies } from '$lib/server/similarMovies/+server';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const similarMovies = await fetchSimilarMovies(id);
	return { similarMovies };
};
