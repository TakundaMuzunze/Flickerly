<script lang="ts">
	import { addToWatchlist } from '$lib/utils/addToWatchlist';
	import type { Movie } from '$lib/types/movie';

	export let movie: Movie;
</script>

<button
	aria-label="Add to watchlist"
	class="group flex aspect-square size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white"
	on:click={() => addToWatchlist(movie)}
>
	<svg
		class="size-5 transition-colors duration-200 group-hover:fill-black md:size-6"
		fill="white"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
		><path
			class="group-hover:stroke-black"
			d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
		/></svg
	>
</button>
