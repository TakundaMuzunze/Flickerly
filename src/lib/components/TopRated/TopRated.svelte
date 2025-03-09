<script>
	// export let movies;
	export let topRatedMovies;
	import MovieGrid from '$lib/components/MovieGrid/MovieGrid.svelte';
	import { fly } from 'svelte/transition';
</script>

<section class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-10 p-10">
	<div in:fly|global={{ y: 50, duration: 650 }} class="flex w-full items-center justify-between">
		<div class="flex flex-col gap-2">
			<!-- <p class="text-xl font-semibold text-white">Latest</p> -->
			<h2 class="relative text-2xl font-semibold text-white">
				Top Rated <span class="animate-pulse">🏆</span>
			</h2>
		</div>

		<a
			href="/trending"
			class="hover:text-accent text-lg font-semibold text-white transition-all duration-300"
		>
			View All →
		</a>
	</div>

	<MovieGrid movies={topRatedMovies} />
</section>
