import { TMDB_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProviders } from '$lib/utils/providers';
import { fetchCast } from '$lib/server/movieCast/+server';
import { fetchTrailer } from '$lib/utils/trailers';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const movieResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=en-US&append_to_response=credits`
	);

	if (!movieResponse.ok) {
		throw error(404, 'Movie not found.');
	}

	const movie = await movieResponse.json();
	const trailer = await fetchTrailer(movie.id);
	const providers = await fetchProviders(movie.id);
	const cast = await fetchCast(movie.id);

	return { movie, trailer, providers, cast };
};
