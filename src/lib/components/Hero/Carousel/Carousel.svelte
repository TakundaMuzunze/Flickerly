<script lang="ts">
	import { onMount } from 'svelte';
	import { movieStore } from '$lib/stores/movieStore.stores.svelte';
	import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

	export let movies: any[] = [];
	export let selectedMovie: any;

	let emblaNode: HTMLElement;
	let emblaApi: EmblaCarouselType | null = null;
	let activeIndex = 0;

	const options: EmblaOptionsType = {
		align: 'start',
		slidesToScroll: 1,
		containScroll: 'keepSnaps',
		dragFree: false,
		loop: false,
		skipSnaps: false
	};

	function updateActiveMovie() {
		if (!emblaApi) return;
		activeIndex = emblaApi.selectedScrollSnap();
		selectedMovie = movies[activeIndex];
		movieStore.selectedMovie = selectedMovie;
	}

	function handleMovieSelect(movie: any, index: number) {
		selectedMovie = movie;
		movieStore.selectedMovie = movie;
		activeIndex = index;
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
			emblaApi.on('select', updateActiveMovie);
			updateActiveMovie();
		}
	});
</script>

<div class="flex w-full justify-center p-5">
	<div class="flex w-full items-center justify-center gap-4">
		<button
			onclick={goToPrevious}
			class="z-20 aspect-square size-6 cursor-pointer rounded-full bg-white/25 text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-black max-md:text-sm md:size-10"
			aria-label="Previous slide"
		>
			←
		</button>

		<div aria-label="Movie carousel" class="relative w-full">
			<div bind:this={emblaNode} class="embla overflow-hidden py-5">
				<div class="embla__container flex w-full gap-2 md:gap-4">
					{#each movies as movie, i}
						<div
							role="button"
							aria-label="Carousel Slide"
							tabindex="0"
							class={`embla__slide transition-transform ${
								i === activeIndex ? 'cursor-pointer opacity-100' : 'pointer-events-none opacity-20'
							}`}
							class:selected={i === activeIndex}
							onclick={() => i === activeIndex && handleMovieSelect(movie, i)}
							onkeydown={(e) => {
								if ((e.key === 'Enter' || e.key === ' ') && i === activeIndex) {
									handleMovieSelect(movie, i);
								}
							}}
						>
							<img
								class="w-full rounded-md shadow-lg max-md:max-w-40 md:max-w-60"
								src={movie.posterUrl}
								alt={movie.title || 'Movie poster'}
								width="240"
								height="360"
								decoding="async"
								loading={i === 0 ? undefined : 'lazy'}
							/>

							{#if i === activeIndex}
								<a
									aria-label="Link to view movie details"
									href={`/movies/${movie.id}`}
									class="group absolute inset-0 flex w-full items-center justify-center rounded-md bg-black/0 transition-all duration-200 ease-in-out hover:bg-black/70"
								>
									<svg
										class="size-16 opacity-0 transition-all group-hover:opacity-100"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										fill="white"
										><path
											d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
										/></svg
									>
								</a>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>

		<button
			onclick={goToNextSlide}
			class="z-20 aspect-square size-6 cursor-pointer rounded-full bg-white/25 text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-black max-md:text-sm md:size-10"
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
		flex: 0 0 80%;
		max-width: 280px;
		position: relative;
		box-sizing: border-box;
	}

	@media (min-width: 768px) {
		.embla__slide {
			flex: 0 0 240px;
		}
	}

	@media (max-width: 768px) {
		.embla__slide {
			flex: 0 0 160px;
		}
	}

	.selected {
		opacity: 1;
		/* border: 2px solid #3d5a80;
		border-radius: 6px; */
		transform: translateY(-20px);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
</style>
