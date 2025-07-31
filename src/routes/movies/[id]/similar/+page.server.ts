import type { PageServerLoad } from './$types';

import { fetchSimilarMovies } from '$lib/services/search';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const similarMovies = await fetchSimilarMovies(parseInt(id));
	return { similarMovies };
};
