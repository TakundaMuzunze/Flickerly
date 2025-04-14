<script lang="ts">
	import Hero from '$lib/components/Hero/Main/Hero.svelte';
	import TopRated from '$lib/components/TopRated/TopRated.svelte';
	import Trending from '$lib/components/TrendingSection/Trending.svelte';
	import Upcoming from '$lib/components/NowPlayingSection/NowPlaying.svelte';
	import Action from '$lib/components/ActionSection/Action.svelte';
	import type { Trailer } from '$lib/types/trailer.js';
	import Comedy from '$lib/components/ComedySection/Comedy.svelte';
	import Thriller from '$lib/components/ThrillerSection/Thriller.svelte';
	import NowPlaying from '$lib/components/NowPlayingSection/NowPlaying.svelte';

	export let data;

	const trailer: Trailer = data.movies?.[0]?.trailer || null;
</script>

<Hero movies={data.movies} {trailer} />
<Trending movies={data.trendingMovies} />
<NowPlaying upcomingMovies={data.inCinemasMovies} releaseDate={true} />
<Comedy comedyMovies={data.comedyMovies} />
<Action actionMovies={data.actionMovies} />
<Thriller thrillerMovies={data.thrillerMovies} />
<TopRated topRatedMovies={data.topRatedMovies} />
