<script lang="ts">
	import { getDirector } from '$lib/utils/movieCrew';
	import { getProductionCompany } from '$lib/utils/productionCompanies';
	import Modal from '../Modal/Modal.svelte';
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
		<h2 class="text-xl font-semibold md:text-2xl lg:text-4xl">{selectedMovie.title}</h2>

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

<Modal
	isOpen={isModalOpen}
	onClose={() => (isModalOpen = false)}
	title={selectedMovie.title}
	subtitle="Overview"
	content={selectedMovie.overview}
	releaseDate={selectedMovie.release_date}
	director={movieDirector}
	productionCompanies={productionCompanies}
/>
