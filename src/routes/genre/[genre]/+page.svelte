<script lang="ts">
	import { browser } from '$app/environment';
	import { movieStore, resetStore, fetchMovies } from '$lib/stores/movieStore.stores.svelte';
	import { genreSubtitles } from '$lib/constants/genreSubtitles.js';
	import ResultsGrid from '$lib/components/layout/Grids/ResultsGrid.svelte';
	import FilterBar from '$lib/components/ui/FilterBar/FilterBar.svelte';
	import { handleScroll } from '$lib/utils/infiniteScroll';

	const { data } = $props();

	let isLoading = $state(false);

	const movies = $derived($movieStore.movies);
	const sortBy = $derived($movieStore.sortBy);
	const currentPage = $derived($movieStore.currentPage);
	const totalPages = $derived($movieStore.totalPages);
	const subtitle = $derived(genreSubtitles[data.subtitleKey]);

	$effect(() => {
		const slug = data.slug;
		const title = data.title;
		let cancelled = false;

		document.title = `${title} | Flickerly`;

		(async () => {
			resetStore();
			isLoading = true;
			try {
				await fetchMovies(slug, 'popularity', 1);
			} finally {
				if (!cancelled) isLoading = false;
			}
		})();

		return () => {
			cancelled = true;
		};
	});

	$effect(() => {
		if (!browser) return;

		const slug = data.slug;
		const onScroll = () => handleScroll(slug, sortBy, currentPage, totalPages, isLoading);

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">{data.title}</h2>
		<p class="text-gray-300 md:text-lg">{subtitle}</p>
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
