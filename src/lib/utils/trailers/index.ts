import { TMDB_KEY } from '$env/static/private';

type TmdbVideo = {
	type: string;
	site: string;
};

export async function fetchTrailer(movieId: number) {
	try {
		const trailerResponse = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_KEY}&language=en-US`
		);

		if (!trailerResponse.ok) {
			return null;
		}

		const trailerData = await trailerResponse.json();

		return (
			trailerData.results.find(
				(video: TmdbVideo) => video.type === 'Trailer' && video.site === 'YouTube'
			) || null
		);
	} catch (error) {
		console.error('Error fetching trailer:', error);
		return null;
	}
}
