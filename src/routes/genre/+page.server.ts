import { fetchComedyMovies } from '$lib/server/comedyMovies/+server';
import { fetchThrillerMovies } from '$lib/server/thrillerMovies/+server';
import { fetchActionMovies } from '$lib/server/actionMovies/+server';
import { fetchDramaMovies } from '$lib/server/dramaMovies/+server';
import { fetchHorrorMovies } from '$lib/server/horrorMovies/+server';
import { fetchScifiMovies } from '$lib/server/scifiMovies/+server';
import { fetchRomanceMovies } from '$lib/server/romanceMovies/+server';

export async function load() {
	const [
		actionMovies,
		comedyMovies,
		thrillerMovies,
		dramaMovies,
		horrorMovies,
		scifiMovies,
		romanceMovies
	] = await Promise.all([
		fetchActionMovies(),
		fetchComedyMovies(),
		fetchThrillerMovies(),
		fetchDramaMovies(),
		fetchHorrorMovies(),
		fetchScifiMovies(),
		fetchRomanceMovies()
	]);

	return {
		actionMovies,
		comedyMovies,
		thrillerMovies,
		dramaMovies,
		horrorMovies,
		scifiMovies,
		romanceMovies
	};
}
