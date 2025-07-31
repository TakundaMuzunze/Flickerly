<script lang="ts">
	import MovieGrid from '../layout/Grids/MovieGrid.svelte';
	import type { Movie } from '$lib/types/movie';
	import { fly } from 'svelte/transition';

	export let movies: Movie[];
	export let title: string;
	export let link: string;
	export let limit: number = 6;
</script>

<section class="min-w-screen-2xl flex flex-col items-start justify-start gap-4 p-5 xl:p-10">
	<div in:fly|global={{ y: 50, duration: 650 }} class="flex w-full items-center justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="relative text-xl font-semibold text-white md:text-2xl">{title}</h2>
		</div>

		<a
			href={link}
			class="text-accent text-lg font-semibold transition-all duration-300 hover:underline hover:underline-offset-6"
		>
			View All →
		</a>
	</div>

	<MovieGrid {movies} {limit} />
</section>
