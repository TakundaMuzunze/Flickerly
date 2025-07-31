<script lang="ts">
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';

	export let data;
</script>

<div class="min-w-screen-2xl flex flex-col items-start justify-start gap-4 p-5 pt-[8rem]">
	{#if data.error}
		<div class="mb-3 md:mb-6">
			<h3 class="text-xl font-semibold text-white md:text-2xl">Search Error</h3>
			<p class="text-red-500">{data.error}</p>
		</div>
	{:else if data.movies.length === 0 && data.query}
		<div class="mb-3 md:mb-6">
			<h3 class="text-xl font-semibold text-white md:text-2xl">No Results Found</h3>
			<p class="text-gray-400">No movies found for "{data.query}". Try a different search term.</p>
		</div>
	{:else if data.movies.length > 0}
		<div class="mb-3 md:mb-6">
			<h3 class="text-xl font-semibold text-white md:text-2xl">
				Results for "{data.query}"
			</h3>
		</div>
		<ResultsGrid movies={data.movies} />
	{:else}
		<div class="mb-3 md:mb-6">
			<h3 class=" text-xl font-semibold text-white md:text-2xl">Search for movies</h3>
			<p class="mt-2 text-gray-400">Start typing in the search bar to discover more movies</p>
		</div>
	{/if}
</div>
