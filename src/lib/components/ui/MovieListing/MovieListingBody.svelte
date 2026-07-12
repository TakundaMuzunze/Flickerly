<script lang="ts">
	import ResultsGrid from '$lib/components/layout/Grids/ResultsGrid.svelte';
	import EmptyState from '$lib/components/ui/EmptyState/EmptyState.svelte';
	import LoadingState from '$lib/components/ui/LoadingState/LoadingState.svelte';
	import type { Movie } from '$lib/types/movie';

	let {
		movies,
		isLoading,
		isLoadingMore,
		error,
		onRetry,
		emptyTitle = 'No movies found',
		emptyDescription = 'Nothing to show here right now. Try a different sort or check back later.'
	}: {
		movies: Movie[];
		isLoading: boolean;
		isLoadingMore: boolean;
		error: string | null;
		onRetry: () => void;
		emptyTitle?: string;
		emptyDescription?: string;
	} = $props();
</script>

{#if movies.length === 0 && isLoading}
	<LoadingState />
{:else if error && movies.length === 0}
	<EmptyState title="Something went wrong" description={error} {onRetry} />
{:else if movies.length === 0}
	<EmptyState title={emptyTitle} description={emptyDescription} />
{:else}
	<div class="w-full transition-opacity duration-200" class:opacity-50={isLoading}>
		<ResultsGrid {movies} releaseDate={true} />
	</div>
{/if}

{#if isLoadingMore}
	<LoadingState message="Loading more movies..." compact />
{/if}
