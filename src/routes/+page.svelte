<script lang="ts">
	import Hero from '$lib/components/sections/Hero/Main/Hero.svelte';
	import MovieSection from '$lib/components/sections/MovieSection.svelte';
	import type { Trailer } from '$lib/types/trailer.js';
	import { onMount } from 'svelte';

	export let data;

	const trailer: Trailer = data.movies?.[0]?.trailer || null;

	onMount(() => {
		document.title = 'Flickerly - Discover Movies & TV Shows';
	});
</script>

<Hero movies={data.movies} {trailer} />

<MovieSection 
	title="Trending Movies" 
	movies={data.trendingMovies} 
	link="/trending" 
/>

<MovieSection 
	title="In Cinemas" 
	movies={data.inCinemasMovies} 
	link="/inCinemas" 
/>

<MovieSection 
	title="Comedy Movies" 
	movies={data.comedyMovies} 
	link="/genre/comedy" 
/>

<MovieSection 
	title="Action Movies" 
	movies={data.actionMovies} 
	link="/genre/action" 
/>

<MovieSection 
	title="Thriller Movies" 
	movies={data.thrillerMovies} 
	link="/genre/thriller" 
/>

<MovieSection 
	title="Top Rated Movies" 
	movies={data.topRatedMovies} 
	link="/topRated" 
/>
