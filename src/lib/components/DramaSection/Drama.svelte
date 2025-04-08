<script lang="ts">
	import MovieGrid from '../MovieGrid/MovieGrid.svelte';
	import type { Movie } from '$lib/types/movie';
	import { fly } from 'svelte/transition';

	export let dramaMovies: Movie[];
</script>

<section class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-6 p-10">
	<div in:fly|global={{ y: 50, duration: 650 }} class="flex w-full items-center justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="relative text-xl font-semibold text-white md:text-2xl">Drama Movies</h2>
		</div>

		<a
			href="/genre/comedy"
			class="text-accent text-lg font-semibold transition-all duration-300 hover:underline hover:underline-offset-6"
		>
			View All →
		</a>
	</div>

	<MovieGrid movies={dramaMovies} limit={6} />
</section>
