import { TMDB_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProviders } from '$lib/utils/providers';
import { fetchCast } from '$lib/server/movieCast/+server';
import { fetchTrailer } from '$lib/utils/trailers';
import { fetchSimilarMovies } from '$lib/server/similarMovies/+server';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const movieRes = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=en-US&append_to_response=credits`
	);

	if (!movieRes.ok) {
		throw error(404, 'Movie not found.');
	}

	const movie = await movieRes.json();

	const [trailer, providers, cast, similarMovies, releaseInfoRes] = await Promise.all([
		fetchTrailer(movie.id),
		fetchProviders(movie.id),
		fetchCast(movie.id),
		fetchSimilarMovies(movie.id),
		fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${TMDB_KEY}`)
	]);

	let certification = '';

	if (releaseInfoRes.ok) {
		const releaseInfo = await releaseInfoRes.json();
		const ukRelease = releaseInfo.results.find((rel: any) => rel.iso_3166_1 === 'GB');

		if (ukRelease) {
			const cert = ukRelease.release_dates.find((r: any) => r.certification);
			if (cert) certification = cert.certification;
		}
	}

	const movieWithCert = {
		...movie,
		certification
	};

	return {
		movie: movieWithCert,
		trailer,
		providers,
		cast,
		similarMovies
	};
};
