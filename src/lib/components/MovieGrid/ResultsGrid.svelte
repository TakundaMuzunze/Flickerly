<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';
	import { fade } from 'svelte/transition';

	export let movies: any[] = [];
	export let releaseDate = false;
</script>

<div
	class="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
>
	{#each movies as movie (movie.id)}
		<div in:fade={{ duration: 200 }} class="max-w-52 shrink-0">
			<MovieCard {movie} showGenre={true} {releaseDate} />
		</div>
	{/each}
</div>
