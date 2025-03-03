<script lang="ts">
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import Poster from '../Poster/Poster.svelte';

	export let movies: any[];

	// Ensure there's at least one movie
	let selectedMovie = movies.length ? movies[0] : null;

	// Update store
	movieStore.movies = movies;
	movieStore.selectedMovie = selectedMovie;
</script>

<section
	class="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center px-8 py-5 text-white"
	style="background-image: {selectedMovie
		? `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`
		: 'none'}"
>
	<!-- Dark overlay for readability -->
	<div class="absolute inset-0 bg-black/80"></div>

	<!-- Content wrapper to align items properly -->
	<div
		class="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-5 md:flex-row lg:gap-10"
	>
		<!-- Movie Poster -->
		<div class="flex h-full w-[35%] min-w-[250px] items-start justify-center">
			<div class="h-full">
				<Poster {selectedMovie} />
			</div>
		</div>

		<!-- Movie Carousel -->
		<div class="w-[55%]">
			<Carousel {movies} bind:selectedMovie />
		</div>
	</div>
</section>
