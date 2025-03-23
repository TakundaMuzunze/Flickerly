<script lang="ts">
	import DetailsLayout from '$lib/components/Details/DetailsHero/DetailsLayout.svelte';
	import MovieDetails from '$lib/components/Details/MovieDetails.svelte';
	import MovieMeta from '$lib/components/Details/MovieMeta/MovieMeta.svelte';
	import Poster from '$lib/components/Hero/Poster/Poster.svelte';
	import Trailer from '$lib/components/TrailerComponent/Trailer.svelte';

	export let data;

	// const selectedMovie = data.movie;
	const trailer = data.trailer;

	const selectedMovie = { ...data.movie, providers: data.providers };
</script>

<DetailsLayout backgroundImage={selectedMovie.backdrop_path}>
	<div slot="poster">
		<Poster {selectedMovie} />
	</div>

	<div slot="details">
		<MovieDetails {selectedMovie} />
	</div>

	<div slot="trailer">
		<Trailer {trailer} />
	</div>

	<div slot="overview">
		<MovieMeta {selectedMovie} />
	</div>
</DetailsLayout>
