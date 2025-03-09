<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';

	export let movies: any[] = [];
</script>

<div class="grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-4">
	{#each movies as movie}
		<MovieCard {movie} showGenre={true} />
	{/each}
</div>
