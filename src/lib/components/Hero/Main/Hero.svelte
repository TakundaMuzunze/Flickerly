<script lang="ts">
	import HeroLayout from '$lib/components/Hero/Main/HeroLayout.svelte';
	import HeroTitle from '../HeroTitle/HeroTitle.svelte';
	import MovieDetails from '$lib/components/Details/MovieDetails.svelte';
	import Carousel from '../Carousel/Carousel.svelte';
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';

	export let movies: any[];

	let selectedMovie = movies.length ? movies[0] : null;

	movieStore.movies = movies;
	movieStore.selectedMovie = selectedMovie;
</script>

<HeroLayout backgroundImage={selectedMovie?.backdrop_path} showCarousel={true}>
	<!-- Inject Title Component -->
	<div slot="title">
		<HeroTitle />
	</div>

	<!-- Inject Movie Details -->
	<div slot="details">
		<MovieDetails {selectedMovie} />
	</div>

	<!-- Inject Carousel -->
	<div slot="carousel">
		<Carousel {movies} bind:selectedMovie />
	</div>
</HeroLayout>
