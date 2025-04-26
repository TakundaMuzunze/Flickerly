<script lang="ts">
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import MovieCard from '../MovieCard/MovieCard.svelte';
	import { fade } from 'svelte/transition';

	const { movies = [], releaseDate = false } = $props();
</script>

<div
	class="grid w-full grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
>
	{#each $movieStore.movies as movie (movie.id)}
		<div in:fade={{ duration: 200 }}>
			<MovieCard {movie} showGenre={true} {releaseDate} />
		</div>
	{/each}
</div>
