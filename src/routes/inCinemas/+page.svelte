<script lang="ts">
	import { browser } from '$app/environment';
	import {
		movieStore,
		resetStore,
		fetchMovies,
		retryFetch
	} from '$lib/stores/movieStore.stores.svelte';
	import { genreSubtitles } from '$lib/constants/genreSubtitles.js';
	import FilterBar from '$lib/components/ui/FilterBar/FilterBar.svelte';
	import MovieListingBody from '$lib/components/ui/MovieListing/MovieListingBody.svelte';
	import { handleScroll } from '$lib/utils/infiniteScroll';

	const listKey = 'now_playing';

	const movies = $derived($movieStore.movies);
	const isLoading = $derived($movieStore.isLoading);
	const isLoadingMore = $derived($movieStore.isLoadingMore);
	const error = $derived($movieStore.error);

	$effect(() => {
		document.title = 'Movies in Cinemas Now | Flickerly';

		resetStore();
		fetchMovies(listKey, 'popularity', 1).catch(() => {});
	});

	$effect(() => {
		if (!browser) return;

		const onScroll = () => handleScroll(listKey);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section
	class="min-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<div class="space-y-2">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">In Cinemas Now</h2>
		<p class="text-gray-300 md:text-lg">{genreSubtitles.nowPlaying}</p>
		<FilterBar />
	</div>

	<MovieListingBody
		{movies}
		{isLoading}
		{isLoadingMore}
		{error}
		onRetry={() => retryFetch().catch(() => {})}
	/>
</section>
