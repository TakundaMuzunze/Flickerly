<script lang="ts">
	import MovieGrid from '../../layout/Grids/MovieGrid.svelte';
	import type { Movie } from '$lib/types/movie';
	import { fly } from 'svelte/transition';

	export let similarMovies: Movie[];
</script>

<section class="min-w-screen-2xl flex flex-col items-start justify-start gap-4 p-5 xl:p-10">
	<div in:fly|global={{ y: 50, duration: 650 }} class="flex w-full items-center justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="relative text-xl font-semibold text-white md:text-2xl">Similar Movies</h2>
		</div>
	</div>

	<MovieGrid movies={similarMovies} limit={6} />
</section>
