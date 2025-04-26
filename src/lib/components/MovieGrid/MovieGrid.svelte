<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';

	export let movies: any[] = [];
	export let releaseDate: boolean = false;
	export let limit: number | undefined = undefined;
</script>

<div
	class="flex w-full gap-6 overflow-x-auto scroll-smooth whitespace-nowrap 2xl:grid 2xl:grid-cols-8 2xl:gap-0"
>
	{#each limit === 6 ? movies.slice(0, 8) : limit ? movies.slice(0, limit) : movies as movie}
		<div class="shrink-0">
			<MovieCard {movie} showGenre={true} {releaseDate} />
		</div>
	{/each}
</div>
