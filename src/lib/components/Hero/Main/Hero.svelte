<script lang="ts">
	import MovieDetails from '$lib/components/Details/MovieDetails.svelte';
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import Herotitle from '../HeroTitle/Herotitle.stories.svelte';
	import HeroTitle from '../HeroTitle/HeroTitle.svelte';
	import Poster from '../Poster/Poster.svelte';

	export let movies: any[];

	let selectedMovie = movies.length ? movies[0] : null;

	movieStore.movies = movies;
	movieStore.selectedMovie = selectedMovie;
</script>

<section
	class="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center py-5 text-white md:px-8"
	style="background-image: {selectedMovie
		? `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`
		: 'none'}"
>
	<!-- Dark overlay for readability -->
	<div class="absolute inset-0 bg-black/80"></div>

	<div
		class="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-5 md:flex-row lg:gap-10"
	>
		<div
			class="flex h-full min-w-[250px] flex-col items-start justify-center gap-5 max-md:px-10 md:w-[35%]"
		>
			<HeroTitle />
			<MovieDetails {selectedMovie} />
		</div>

		<div class="max-md:w-full md:w-[55%]">
			<Carousel {movies} bind:selectedMovie />
		</div>
	</div>
</section>
