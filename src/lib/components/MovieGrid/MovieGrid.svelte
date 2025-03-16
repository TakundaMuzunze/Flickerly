<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';

	export let movies: any[] = [];
	// export let releaseDate: boolean = false;
	export let releaseDate: boolean = false;
</script>

<div
	class="flex w-full gap-4 overflow-x-auto scroll-smooth whitespace-nowrap md:grid md:grid-cols-4 md:gap-8"
>
	{#each movies as movie}
		<div class="shrink-0">
			<MovieCard {movie} showGenre={true} {releaseDate} />
		</div>
	{/each}
</div>
