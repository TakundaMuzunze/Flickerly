<script lang="ts">
	import CastCard from '$lib/components/Details/Cast/CastCard.svelte';
	import CastGrid from '$lib/components/Details/Cast/CastGrid.svelte';
	import DetailsLayout from '$lib/components/Details/DetailsHero/DetailsLayout.svelte';
	import MovieDetails from '$lib/components/Details/MovieDetails.svelte';
	import Poster from '$lib/components/Hero/Poster/Poster.svelte';
	import Similar from '$lib/components/SimilarSection/Similar.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	const trailer = $derived(data.trailer);
	const cast = $derived(data.cast);
	const selectedMovie = $derived({ ...data.movie, providers: data.providers });

	$effect(() => {
		document.title = `${selectedMovie.title} | Flickerly`;
	});
</script>

<DetailsLayout backgroundImage={selectedMovie.backdrop_path}>
	<div slot="poster">
		<Poster {selectedMovie} />
	</div>

	<div slot="details">
		<MovieDetails {selectedMovie} {trailer} />
	</div>

	<div slot="cast">
		<CastGrid {cast} />
	</div>

	<div slot="similar">
		<Similar similarMovies={data.similarMovies} {selectedMovie} />
	</div>
</DetailsLayout>
