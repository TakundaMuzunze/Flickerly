<script lang="ts">
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import { onMount } from 'svelte';
	import { fetchMovies } from '$lib/stores/movieStore.stores.svelte';
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';
	import FilterBar from '$lib/components/FilterBar/FilterBar.svelte';
	import { genreSubtitles } from '$lib/constants/genreSubtitles.js';
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
		await fetchMovies('53', 'popularity', 1);
		document.title = 'Thriller Movies | Flickerly';
	});

	onMount(() => {
		window.addEventListener('scroll', () =>
			handleScroll('53', sortBy, currentPage, totalPages, isLoading)
		);
		return () => {
			window.removeEventListener('scroll', () =>
				handleScroll('53', sortBy, currentPage, totalPages, isLoading)
			);
		};
	});
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">Thriller Movies</h2>
		<p class="text-gray-300 md:text-lg">{genreSubtitles.thriller}</p>
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
