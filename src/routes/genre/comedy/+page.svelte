<script lang="ts">
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import { onMount } from 'svelte';
	import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
	import FilterBar from '$lib/components/ui/FilterBar/FilterBar.svelte';
	import ResultsGrid from '$lib/components/layout/Grids/ResultsGrid.svelte';
	import { genreSubtitles } from '$lib/constants/genreSubtitles';
	import { handleScroll } from '$lib/utils/infiniteScroll';

	let movies = $movieStore.movies;
	let selectedMovie = $movieStore.selectedMovie;
	let trailer = $movieStore.trailer;
	let sortBy = $movieStore.sortBy;
	let currentPage = $movieStore.currentPage;
	let totalPages = $movieStore.totalPages;
	let isLoading = false;

	$: {
		movies = $movieStore.movies;
		selectedMovie = $movieStore.selectedMovie;
		trailer = $movieStore.trailer;
		sortBy = $movieStore.sortBy;
		currentPage = $movieStore.currentPage;
		totalPages = $movieStore.totalPages;
	}

	onMount(async () => {
		await fetchMovies('35', 'popularity', 1);
		document.title = 'Comedy Movies | Flickerly';
	});

	onMount(() => {
		window.addEventListener('scroll', () =>
			handleScroll('35', sortBy, currentPage, totalPages, isLoading)
		);
		return () => {
			window.removeEventListener('scroll', () =>
				handleScroll('35', sortBy, currentPage, totalPages, isLoading)
			);
		};
	});
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">Comedy Movies</h2>
		<p class="text-gray-300 md:text-lg">{genreSubtitles.comedy}</p>
		<FilterBar />
	</div>

	{#if movies.length === 0 && isLoading}
		<div class="flex h-64 w-full items-center justify-center">
			<div class="text-white">Loading...</div>
		</div>
	{:else}
		<ResultsGrid {movies} releaseDate={true} />
	{/if}

	{#if isLoading && movies.length > 0}
		<div class="flex h-32 w-full items-center justify-center">
			<div class="text-white">Loading more movies...</div>
		</div>
	{/if}
</section>
