<script>
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Hero from '$lib/components/Hero/Main/Hero.svelte';
	import TopRated from '$lib/components/TopRated/TopRated.svelte';
	import Trending from '$lib/components/TrendingSection/Trending.svelte';
	import Upcoming from '$lib/components/UpcomingSection/Upcoming.svelte';

	export let data;
</script>

<Header />
<Hero movies={data.movies} />
<Trending movies={data.trendingMovies} />
<TopRated topRatedMovies={data.topRatedMovies} />
<Upcoming upcomingMovies={data.upcomingMovies} releaseDate={true} />
<Footer />
