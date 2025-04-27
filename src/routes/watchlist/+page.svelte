<script lang="ts">
	import WatchlistGrid from '$lib/components/MovieGrid/WatchlistGrid.svelte';
	import { watchlist } from '$lib/stores/watchlist.stores.svelte';
	import type { Movie } from '$lib/types/movie';
	import { onMount } from 'svelte';

	let movies: Movie[] = [];

	$: movies = $watchlist;

	onMount(() => {
		document.title = 'My Watchlist | Flickerly';
	});
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">Your Watchlist</h2>
		<p class="text-gray-300 md:text-lg">Your curated collection — ready when you are.</p>
	</div>
	{#if movies.length > 0}
		<WatchlistGrid {movies} />
	{:else}
		<p class="text-gray-300 md:text-lg">
			No movies saved to your watchlist yet. <a class="text-white underline" href="/"
				>Start exploring</a
			> and tap the '+' to add them here.
		</p>
	{/if}
</section>
