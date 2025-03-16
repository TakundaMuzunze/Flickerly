<script lang="ts">
	import { onMount } from 'svelte';
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

	export let movies: any[] = [];
	export let selectedMovie: any;

	let emblaNode: HTMLElement;
	let emblaApi: EmblaCarouselType | null = null;
	let activeIndex = 0; // Track the active slide

	const options: EmblaOptionsType = {
		align: 'start',
		slidesToScroll: 1,
		containScroll: 'trimSnaps',
		dragFree: false,
		loop: false,
		skipSnaps: false
	};

	function updateActiveMovie() {
		if (!emblaApi) return;
		activeIndex = emblaApi.selectedScrollSnap();
		selectedMovie = movies[activeIndex]; // Update selected movie
		movieStore.selectedMovie = selectedMovie;
	}

	function handleMovieSelect(movie: any, index: number) {
		selectedMovie = movie;
		movieStore.selectedMovie = movie;
		activeIndex = index; // Set active index when clicking
	}

	function goToNextSlide() {
		if (emblaApi?.canScrollNext()) {
			emblaApi.scrollNext();
			updateActiveMovie();
		}
	}

	function goToPrevious() {
		if (emblaApi?.canScrollPrev()) {
			emblaApi.scrollPrev();
			updateActiveMovie();
		}
	}

	onMount(async () => {
		const { default: EmblaCarousel } = await import('embla-carousel');

		if (emblaNode) {
			emblaApi = EmblaCarousel(emblaNode, options);
			emblaApi.on('select', updateActiveMovie); // Detect slide changes
			updateActiveMovie(); // Set initial selected movie
		}
	});
</script>

<div class="flex w-full justify-center py-5">
	<div class="flex w-full max-w-6xl md:max-w-4xl items-center justify-center lg:justify-evenly">
		<button
			onclick={goToPrevious}
			class=" mr-3 cursor-pointer rounded-2xl bg-black/60 px-4 py-2 text-white transition-colors hover:bg-black/80"
			aria-label="Previous slide"
		>
			←
		</button>

		<div class="relative w-full">
			<div bind:this={emblaNode} class="embla overflow-hidden py-5">
				<div class="embla__container flex gap-2 md:gap-4 w-full">
					{#each movies as movie, i}
						<div
							role="button"
							tabindex="0"
							class="embla__slide cursor-pointer transition-transform"
							class:selected={i === activeIndex}
							onclick={() => handleMovieSelect(movie, i)}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleMovieSelect(movie, i)}
						>
							<img
								class="w-full rounded-md shadow-lg"
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title || 'Movie poster'}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<button
			onclick={goToNextSlide}
			class=" ml-3 cursor-pointer rounded-2xl bg-black/60 px-4 py-2 text-white transition-colors hover:bg-black/80"
			aria-label="Next slide"
		>
			→
		</button>
	</div>
</div>


<style>
.embla {
		position: relative;
		max-width: 100%;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		flex: 0 0 80%; /* Makes slides take 80% of the screen on mobile */
		max-width: 280px; /* Prevents them from getting too large on wider screens */
		position: relative;
		box-sizing: border-box;
		opacity: 0.5;
	}

	@media (min-width: 768px) {
		.embla__slide {
			flex: 0 0 240px; /* Standard size for larger screens */
		}
	}

	.selected {
		opacity: 1;
		/* border: 2px solid #3d5a80;
		border-radius: 6px; */
		transform: translateY(-15px);
		transition: transform 0.2s ease, box-shadow 0.2s ease; 
	}
</style>

