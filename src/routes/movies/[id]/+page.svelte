<script lang="ts">
	import CastCard from '$lib/components/features/Details/Cast/CastCard.svelte';
	import CastGrid from '$lib/components/features/Details/Cast/CastGrid.svelte';
	import DetailsLayout from '$lib/components/features/Details/DetailsHero/DetailsLayout.svelte';
	import MovieDetails from '$lib/components/features/Details/MovieDetails.svelte';
	import Similar from '$lib/components/sections/SimilarSection/Similar.svelte';

	const { data } = $props();

	const trailer = $derived(data.trailer);
	const cast = $derived(data.cast);
	const selectedMovie = $derived({ ...data.movie, providers: data.providers });
	const similarMovies = $derived(data.similarMovies);

	$effect(() => {
		document.title = `${selectedMovie.title} | Flickerly`;
	});
</script>

<DetailsLayout backgroundImage={selectedMovie.backdrop_path}>
	<div slot="details">
		<MovieDetails {selectedMovie} {trailer} />
	</div>

	<div slot="cast">
		<CastGrid {cast} />
	</div>

	<div slot="similar">
		<Similar {similarMovies} {selectedMovie} />
	</div>
</DetailsLayout>
