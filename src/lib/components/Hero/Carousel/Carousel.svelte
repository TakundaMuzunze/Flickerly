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
		containScroll: 'trimSnaps',
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

<div class="flex w-full justify-center py-5">
	<div class="flex w-full max-w-6xl items-center justify-center md:max-w-4xl lg:justify-evenly">
		<button
			onclick={goToPrevious}
			class=" mr-3 cursor-pointer rounded-2xl bg-black/60 px-4 py-2 text-white transition-colors hover:bg-black/80"
			aria-label="Previous slide"
		>
			←
		</button>

		<div class="relative w-full">
			<div bind:this={emblaNode} class="embla overflow-hidden py-5">
				<div class="embla__container flex w-full gap-2 md:gap-4">
					{#each movies as movie, i}
						<div
							role="button"
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
								class="w-full rounded-md shadow-lg"
								src={movie.posterUrl}
								alt={movie.title || 'Movie poster'}
								width="750"
								height="500"
							/>

							{#if i === activeIndex}
								<a
									aria-label="Link to movie"
									href={`/movies/${movie.id}`}
									class="group absolute inset-0 flex w-full items-center justify-center rounded-md bg-black/0 transition-all duration-200 ease-in-out hover:bg-black/60"
								>
									<svg
										class="size-16 opacity-0 transition-all group-hover:opacity-100"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										fill="white"
									>
										<path
											d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9l0-176c0-8.7 4.7-16.7 12.3-20.9z"
										/>
									</svg>
								</a>
							{/if}
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
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
</style>
