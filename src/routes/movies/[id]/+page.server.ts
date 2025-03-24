// src/routes/movies/[id]/+page.server.ts
import { TMDB_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProviders } from '$lib/utils/providers';
import { fetchCast } from '$lib/server/movieCast/+server';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const movieResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=en-US`
	);

	const trailerResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_KEY}&language=en=US`
	);

	if (!movieResponse.ok) {
		throw error(404, 'Movie not found.');
	}

	if (!trailerResponse.ok) {
		throw error(404, 'Movie trailer not found.');
	}

	const movie = await movieResponse.json();
	const trailerData = await trailerResponse.json();
	const providers = await fetchProviders(movie.id);
	const cast = await fetchCast(movie.id);

	const trailer =
		trailerData.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube') ??
		null;

	return { movie, trailer, providers, cast };
};
