<script lang="ts">
	import { getGenreName } from '$lib/utils/genres';
	import { hasImageLoaded, markImageAsLoaded } from '$lib/utils/imageCaching';
	import { onMount } from 'svelte';

	export let movie: any;
	export let showGenre: boolean = false;
	export let releaseDate: boolean = false;

	const genres = movie.genre_ids?.map((id: number) => getGenreName(id)).join(', ') || 'Unknown';

	let hasLoaded = false;
	let hasError = false;

	const posterUrl = movie.posterUrl || `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

	function handleLoad() {
		if (posterUrl) {
			markImageAsLoaded(posterUrl);
			hasLoaded = true;
		}
	}

	function handleError() {
		hasError = true;
	}

	onMount(() => {
		if (posterUrl && hasImageLoaded(posterUrl)) {
			hasLoaded = true;
		}
	});
</script>

<a href={`/movies/${movie.id}`}>
	<div class="relative w-full max-w-48 cursor-pointer rounded-lg 2xl:w-54">
		<div class="relative">
			<img
				class="movie aspect-[2/3] w-full rounded-lg"
				src={posterUrl}
				alt={movie.title}
				on:load={handleLoad}
				on:error={handleError}
			/>

			<!-- <div class="bg-accent absolute top-0 right-0 rounded-lg px-3 py-2 text-white">
				<p>⭐ {movie.vote_average.toFixed(1)}</p>
			</div> -->

			<div
				class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/80 opacity-0 duration-300 hover:opacity-100"
			>
				<svg class="size-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
					<path
						d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9l0-176c0-8.7 4.7-16.7 12.3-20.9z"
					/>
				</svg>
			</div>
		</div>

		<!-- {#if showGenre}
			<div class="mt-3 w-full">
				<div class="flex flex-col items-start justify-center gap-2 text-wrap">
					<p class="font-semibold text-white">{movie.title}</p>
					<p class=" text-sm text-gray-400">{genres}</p>
				</div>
				{#if releaseDate}
					<p class="mt-2 text-sm text-gray-400 italic">({movie.release_date})</p>
				{/if}
			</div>
		{/if} -->
	</div>
</a>
