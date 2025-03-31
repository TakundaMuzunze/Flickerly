<script lang="ts">
	import { getDirector } from '$lib/utils/movieCrew';
	import { getProductionCompany } from '$lib/utils/productionCompanies';
	import MovieMeta from './MovieMeta/MovieMeta.svelte';

	export let selectedMovie;
	export let trailer;

	let isModalOpen = false;

	$: movieDirector = getDirector(selectedMovie.credits?.crew);
	$: productionCompanies = getProductionCompany(selectedMovie.production_companies);

	const googleWatchLink = `https://www.google.com/search?q=where+to+watch+${encodeURIComponent(selectedMovie.title)}+UK`;

	function closeModal() {
		isModalOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<div class="flex w-full flex-col items-start justify-start gap-4">
	<div class="flex w-full flex-col gap-3 py-4">
		<h2 class="text-xl font-semibold">{selectedMovie.title}</h2>

		<MovieMeta {selectedMovie} {trailer} />

		{#if selectedMovie.vote_average.toFixed(1) <= 0}
			<p class="font-normal text-gray-400 italic">Be the first to review</p>
		{:else}
			<p class="font-normal">⭐ {selectedMovie.vote_average.toFixed(1)} /10</p>
		{/if}

		<div class="flex flex-col gap-2">
			<p class="text-base font-normal">
				{selectedMovie.overview.slice(0, 150)}...
			</p>
			<button
				class="text-accent w-fit cursor-pointer font-semibold underline underline-offset-8"
				onclick={() => (isModalOpen = true)}
			>
				Read More
			</button>
		</div>

		{#if selectedMovie.providers?.GB?.flatrate || selectedMovie.providers?.GB?.rent}
			<div class="text-main-btn mt-2 flex flex-col gap-3">
				<p class="font-semibold">Available to stream or rent on:</p>
				<ul class="flex flex-wrap gap-2">
					{#each selectedMovie.providers.GB.flatrate as provider}
						<a
							href={selectedMovie.providers.GB.link || '#'}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-main-btn rounded-2xl px-2 py-1 text-sm text-white"
						>
							{provider.provider_name}
						</a>
					{/each}
					{#each selectedMovie.providers.GB.rent || [] as provider}
						<a
							href={selectedMovie.providers.GB.link || '#'}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-main-btn rounded-2xl px-3 py-1 text-sm text-white"
						>
							{provider.provider_name}
						</a>
					{/each}
				</ul>
			</div>
		{:else}
			<p class="text-main-btn w-fit font-semibold">No streaming options found in the UK.</p>
			<a
				href={googleWatchLink}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-main-btn hover:bg-main-btn/80 w-fit rounded-2xl px-3 py-1 text-sm text-white transition"
			>
				🔍 Find where to watch
			</a>
		{/if}
	</div>
</div>

{#if isModalOpen}
	<div
		role="button"
		tabindex="0"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
		onclick={closeModal}
		onkeydown={handleKeydown}
	>
		<div
			class="relative max-h-[80vh] w-full max-w-72 overflow-y-auto rounded-lg bg-gray-900 p-6 shadow-xl md:max-w-2xl"
		>
			<button
				class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
				onclick={closeModal}
				aria-label="Close modal"
			>
				✕
			</button>

			<div class="mb-4 flex flex-col gap-2">
				<h2 class="text-2xl font-bold">{selectedMovie.title}</h2>
				<p class=" text-gray-400">Overview</p>
			</div>
			<p class="mb-4 whitespace-pre-wrap text-gray-300">{selectedMovie.overview}</p>
			<div class="flex flex-col gap-2">
				<p class="whitespace-pre-wrap text-gray-400">Director: {movieDirector}</p>
				<p class="whitespace-pre-wrap text-gray-400">
					Production: {productionCompanies}
				</p>
			</div>
		</div>
	</div>
{/if}
