<script lang="ts">
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';

	export let data;
</script>

<div class="w-full">
	{#if data.error}
		<h3 class="mb-3 text-xl font-semibold text-white md:mb-6 md:text-2xl">Search Error</h3>
		<div class="text-red-500">
			{data.error}
		</div>
	{:else if data.movies.length === 0 && data.query}
		<h3 class="mb-3 text-xl font-semibold text-white md:mb-6 md:text-2xl">No Results Found</h3>
		<div class="text-gray-400">
			No movies found for "{data.query}". Try a different search term.
		</div>
	{:else if data.movies.length > 0}
		<h3 class="mb-3 text-xl font-semibold text-white md:mb-6 md:text-2xl">
			Results for "{data.query}"
		</h3>
		<ResultsGrid movies={data.movies} />
	{:else}
		<h3 class="mb-3 text-xl font-semibold text-white md:mb-6 md:text-2xl">Search Movies</h3>
		<div class="text-gray-400">Start typing to search for movies</div>
	{/if}
</div>
