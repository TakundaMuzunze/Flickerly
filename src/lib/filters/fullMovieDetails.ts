import { fetchProviders } from '$lib/utils/providers';
import { fetchTrailer } from '$lib/utils/trailers';
import { TMDB_KEY } from '$env/static/private';
import type { Movie } from '$lib/types/movie';

export async function fetchFullMovieDetails(movie: Movie) {
	if (!movie) return null;

	const movieId = movie.id;

	const [trailer, providers, detailsResponse, releaseInfoRes] = await Promise.all([
		fetchTrailer(movieId),
		fetchProviders(movieId),
		fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US&append_to_response=credits`
		),
		fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${TMDB_KEY}`)
	]);

	const fullDetails = await detailsResponse.json();
	let certification = '';

	if (releaseInfoRes.ok) {
		const releaseInfo = await releaseInfoRes.json();
		const ukRelease = releaseInfo.results.find((rel: any) => rel.iso_3166_1 === 'GB');

		if (ukRelease) {
			const cert = ukRelease.release_dates.find((r: any) => r.certification);
			if (cert) certification = cert.certification;
		}
	}

	const movieWithDetails = {
		...movie,
		...fullDetails,
		trailer,
		providers,
		certification,
		posterUrl: fullDetails.poster_path
			? `https://image.tmdb.org/t/p/w500${fullDetails.poster_path}`
			: null,
		backdropUrl: fullDetails.backdrop_path
			? `https://image.tmdb.org/t/p/w780${fullDetails.backdrop_path}`
			: null
	};

	return movieWithDetails;
}
