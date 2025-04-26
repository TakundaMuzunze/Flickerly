<script lang="ts">
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';
	import { genreSubtitles } from '$lib/constants/genreSubtitles.js';
	import FilterBar from '$lib/components/FilterBar/FilterBar.svelte';
	import { onMount } from 'svelte';
	export let data;

	onMount(() => {
		document.title = 'Top Rated Movies | Flickerly';
	});
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">Top Rated Movies</h2>
		<p class="text-gray-300 md:text-lg">{genreSubtitles.topRated}</p>
		<FilterBar />
	</div>
	<ResultsGrid movies={data.topRatedMovies} releaseDate={true} />
</section>
