<script lang="ts">
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';
	import { genreSubtitles } from '$lib/constants/genreSubtitles.js';
	import FilterBar from '$lib/components/FilterBar/FilterBar.svelte';
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import { onMount } from 'svelte';
	import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';

	const movies = $state($movieStore.movies);
	const selectedMovie = $state($movieStore.selectedMovie);
	const trailer = $state($movieStore.trailer);
	const sortBy = $state($movieStore.sortBy);

	onMount(async () => {
		await fetchMovies('53', 'popularity');
		document.title = 'Thriller Movies | Flickerly';
	});

	// export let data;
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">Thriller Movies</h2>
		<p class="text-gray-300 md:text-lg">{genreSubtitles.thriller}</p>
		<FilterBar />
	</div>
	<ResultsGrid {movies} releaseDate={true} />
</section>
