<script lang="ts">
	import CastCard from '$lib/components/Details/Cast/CastCard.svelte';
	import CastGrid from '$lib/components/Details/Cast/CastGrid.svelte';
	import DetailsLayout from '$lib/components/Details/DetailsHero/DetailsLayout.svelte';
	import MovieDetails from '$lib/components/Details/MovieDetails.svelte';
	import MovieMeta from '$lib/components/Details/MovieMeta/MovieMeta.svelte';
	import Poster from '$lib/components/Hero/Poster/Poster.svelte';
	import MovieGrid from '$lib/components/MovieGrid/MovieGrid.svelte';
	import Similar from '$lib/components/SimilarSection/Similar.svelte';
	import Trailer from '$lib/components/TrailerComponent/Trailer.svelte';

	export let data;

	const trailer = data.trailer;
	const cast = data.cast;

	const selectedMovie = { ...data.movie, providers: data.providers };
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
