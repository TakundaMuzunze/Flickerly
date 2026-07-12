import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGenrePage } from '$lib/constants/genres';

export const load: PageServerLoad = async ({ params }) => {
	const genre = getGenrePage(params.genre);

	if (!genre) {
		throw error(404, 'Genre not found.');
	}

	return {
		slug: genre.slug,
		title: genre.title,
		subtitleKey: genre.subtitleKey
	};
};
