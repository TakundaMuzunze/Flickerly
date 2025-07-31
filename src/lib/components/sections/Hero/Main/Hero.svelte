<script lang="ts">
	import HeroLayout from './HeroLayout.svelte';
	import HeroTitle from '../HeroTitle/HeroTitle.svelte';
	import MovieDetails from '$lib/components/features/Details/MovieDetails.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import type { Movie } from '$lib/types/movie';

	export let movies: Movie[];

	let selectedMovie = movies.length ? movies[0] : null;
	let trailer = selectedMovie?.trailer ?? null;
	$: trailer = selectedMovie?.trailer ?? null;

	movieStore.movies = movies;
	movieStore.selectedMovie = selectedMovie;
</script>

<HeroLayout backgroundImage={selectedMovie?.backdrop_path} showCarousel={true}>
	<div slot="details">
		<MovieDetails {selectedMovie} {trailer} />
	</div>

	<div slot="carousel">
		<Carousel {movies} bind:selectedMovie />
	</div>
</HeroLayout>
