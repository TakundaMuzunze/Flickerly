<script>
	// export let movies;
	export let topRatedMovies;
	import MovieGrid from '$lib/components/MovieGrid/MovieGrid.svelte';
	import { fly } from 'svelte/transition';
</script>

<section class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-6 p-10">
	<div in:fly|global={{ y: 50, duration: 650 }} class="flex w-full items-center justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="relative text-xl font-semibold text-white md:text-2xl">Top rated movies</h2>
		</div>

		<a
			href="/topRated"
			class="text-accent text-lg font-semibold transition-all duration-300 hover:underline hover:underline-offset-6"
		>
			View All →
		</a>
	</div>

	<MovieGrid movies={topRatedMovies} limit={6} />
</section>
