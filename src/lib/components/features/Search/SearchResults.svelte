<script lang="ts">
	import ResultsGrid from '$lib/components/layout/Grids/ResultsGrid.svelte';
	import EmptyState from '$lib/components/ui/EmptyState/EmptyState.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;
</script>

<div class="min-w-screen-2xl flex flex-col items-start justify-start gap-4 p-5 pt-[8rem]">
	{#if data.error}
		<EmptyState
			title="Search Error"
			description={data.error}
			onRetry={() => invalidateAll()}
		/>
	{:else if data.movies.length === 0 && data.query}
		<EmptyState
			title="No results found"
			description={`No movies found for "${data.query}". Try a different search term.`}
		/>
	{:else if data.movies.length > 0}
		<div class="mb-3 md:mb-6">
			<h3 class="text-xl font-semibold text-white md:text-2xl">
				Results for "{data.query}"
			</h3>
		</div>
		<ResultsGrid movies={data.movies} />
	{:else}
		<EmptyState
			title="Search for movies"
			description="Start typing in the search bar to discover more movies."
		/>
	{/if}
</div>
