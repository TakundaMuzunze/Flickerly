<script lang="ts">
	import MovieCard from '../MovieCard/MovieCard.svelte';

	export let movies: any[] = [];
	export let releaseDate: boolean = false;
	export let limit: number | undefined = undefined;

	let scrollContainer: HTMLDivElement;
	let showLeftArrow = false;
	let showRightArrow = true;

	function scrollRight() {
		if (scrollContainer) {
			const scrollAmount = scrollContainer.clientWidth * 0.8;
			scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}

	function scrollLeft() {
		if (scrollContainer) {
			const scrollAmount = scrollContainer.clientWidth * 0.8;
			scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		}
	}

	function checkScroll() {
		if (scrollContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
			showLeftArrow = scrollLeft > 0;
			showRightArrow = scrollLeft < scrollWidth - clientWidth - 10; // 10px buffer
		}
	}
</script>

<div class="relative w-full">
	<div
		bind:this={scrollContainer}
		on:scroll={checkScroll}
		class="flex w-full gap-3 overflow-x-auto scroll-smooth whitespace-nowrap lg:gap-3 2xl:grid 2xl:grid-cols-8 2xl:gap-2"
	>
		{#each limit === 6 ? movies.slice(0, 8) : limit ? movies.slice(0, limit) : movies as movie}
			<div class="max-w-28 shrink-0 md:max-w-40 xl:max-w-52">
				<MovieCard {movie} showGenre={true} {releaseDate} />
			</div>
		{/each}
	</div>

	<!-- Left Arrow -->
	{#if showLeftArrow}
		<div
			class="absolute top-0 left-0 z-10 hidden h-full w-32 bg-gradient-to-r from-black/60 via-black/80 to-transparent transition-all duration-300 ease-out lg:block 2xl:hidden"
		>
			<button
				on:click={scrollLeft}
				class="flex h-full w-full items-center justify-start pl-2 transition-transform hover:scale-110"
				aria-label="Scroll left"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-8 text-white"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M19 12H5M12 19l-7-7 7-7" />
				</svg>
			</button>
		</div>
	{/if}

	<!-- Right Arrow -->
	{#if showRightArrow}
		<div
			class="absolute top-0 right-0 z-10 hidden h-full w-32 bg-gradient-to-l from-black/60 via-black/80 to-transparent transition-all duration-300 ease-in-out lg:block 2xl:hidden"
		>
			<button
				on:click={scrollRight}
				class="flex h-full w-full items-center justify-end pr-2 transition-transform hover:scale-110"
				aria-label="Scroll right"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-8 text-white"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	{/if}
</div>
