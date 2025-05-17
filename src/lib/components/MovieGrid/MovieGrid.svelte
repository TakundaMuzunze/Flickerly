<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';

	export let movies: any[] = [];
	export let releaseDate: boolean = false;
	export let limit: number | undefined = undefined;
</script>

<div
	class="flex w-full gap-3 overflow-x-auto scroll-smooth whitespace-nowrap lg:gap-6 2xl:grid 2xl:grid-cols-8 2xl:gap-0"
>
	{#each limit === 6 ? movies.slice(0, 8) : limit ? movies.slice(0, limit) : movies as movie}
		<div class="max-w-28 shrink-0 md:max-w-40 xl:max-w-52">
			<MovieCard {movie} showGenre={true} {releaseDate} />
		</div>
	{/each}
</div>
