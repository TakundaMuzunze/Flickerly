<script lang="ts">
	import Hero from '$lib/components/Hero/Main/Hero.svelte';
	import TopRated from '$lib/components/TopRated/TopRated.svelte';
	import Trending from '$lib/components/TrendingSection/Trending.svelte';
	import Upcoming from '$lib/components/NowPlayingSection/NowPlaying.svelte';
	import type { Trailer } from '$lib/types/trailer.js';

	export let data;

	const trailer: Trailer = data.movies?.[0]?.trailer || null;
</script>

<Hero movies={data.movies} {trailer} />

<Trending movies={data.trendingMovies} />
<TopRated topRatedMovies={data.topRatedMovies} />
<Upcoming upcomingMovies={data.inCinemasMovies} releaseDate={true} />
