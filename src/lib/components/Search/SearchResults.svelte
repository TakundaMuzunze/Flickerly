<script lang="ts">
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';

	export let data;
</script>

<div class="w-full">
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
			<h3 class=" text-xl font-semibold text-white md:text-2xl">Search Movies</h3>
			<p class="text-gray-400">Start typing to search for movies</p>
		</div>
	{/if}
</div>
