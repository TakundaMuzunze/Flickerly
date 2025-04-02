<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';

	export let movies: any[] = [];
	export let releaseDate: boolean = false;
</script>

<div class="grid w-full grid-cols-2 gap-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
	{#each movies as movie}
		<div>
			<MovieCard {movie} showGenre={true} {releaseDate} />
		</div>
	{/each}
</div>
