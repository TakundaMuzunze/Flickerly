<script>
	export let movies;
	import MovieGrid from '$lib/components/MovieGrid/MovieGrid.svelte';
	import { fly } from 'svelte/transition';
</script>

<section class="min-w-screen-2xl flex flex-col items-start justify-start gap-4 p-5 xl:p-10">
	<div in:fly|global={{ y: 50, duration: 650 }} class="flex w-full items-center justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="relative text-xl font-semibold text-white md:text-2xl">Trending Movies</h2>
		</div>

		<a
			href="/trending"
			class="text-accent text-lg font-semibold transition-all duration-300 hover:underline hover:underline-offset-6"
		>
			View All →
		</a>
	</div>

	<MovieGrid {movies} limit={6} />
</section>
