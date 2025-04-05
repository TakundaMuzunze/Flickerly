<script lang="ts">
	import ResultsGrid from '$lib/components/MovieGrid/ResultsGrid.svelte';

	export let data;
</script>

{#if data.error}
	<div class="text-red-500">
		{data.error}
	</div>
{:else if data.movies.length === 0 && data.query}
	<div class="text-gray-400">
		No results found for "{data.query}"
	</div>
{:else if data.movies.length > 0}
	<div class="w-full">
		<h3 class="mb-6 text-xl font-semibold text-white md:text-2xl">Results for "{data.query}"</h3>
		<ResultsGrid movies={data.movies} />
	</div>
{:else}
	<div class="text-gray-400">Start typing to search for movies</div>
{/if}
