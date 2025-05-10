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

<div class="flex flex-col">
	<a href={`/movies/${movie.id}`} class="inline-block w-full">
		<div class="relative w-full">
			<img
				class="movie aspect-[2/3] w-full rounded-lg"
				src={posterUrl}
				alt={movie.title}
				on:load={handleLoad}
				on:error={handleError}
			/>

			<div
				class="absolute inset-0 z-10 flex w-full flex-col items-center justify-center gap-3 rounded-lg bg-black/90 p-2 text-center text-wrap opacity-0 duration-300 hover:opacity-100"
			>
				<p class="font-semibold text-white">{movie.title}</p>
				<p class="text-sm text-gray-400">{genres}</p>

				<div class="group relative w-fit">
					<button
						class="flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg bg-white/25 px-2 py-1 backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white"
					>
						View details
						<svg
							class="size-5 transition-all duration-200"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 576 512"
							><path
								d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
							/></svg
						>
					</button>
				</div>
			</div>
		</div>
	</a>
</div>
