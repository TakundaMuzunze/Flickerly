import { fetchMoviesByGenre, GENRES } from '$lib/services/movies';

export async function load() {
	const [
		actionMovies,
		comedyMovies,
		thrillerMovies,
		dramaMovies,
		horrorMovies,
		scifiMovies,
		romanceMovies,
		fantasyMovies
	] = await Promise.all([
		fetchMoviesByGenre(GENRES.action),
		fetchMoviesByGenre(GENRES.comedy),
		fetchMoviesByGenre(GENRES.thriller),
		fetchMoviesByGenre(GENRES.drama),
		fetchMoviesByGenre(GENRES.horror),
		fetchMoviesByGenre(GENRES.scifi),
		fetchMoviesByGenre(GENRES.romance),
		fetchMoviesByGenre(GENRES.fantasy)
	]);

	return {
		actionMovies,
		comedyMovies,
		thrillerMovies,
		dramaMovies,
		horrorMovies,
		scifiMovies,
		romanceMovies,
		fantasyMovies
	};
}
