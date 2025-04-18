<script lang="ts">
	import { getDirector } from '$lib/utils/movieCrew';
	import { getProductionCompany } from '$lib/utils/productionCompanies';
	import Modal from '../Modal/Modal.svelte';
	import MovieMeta from './MovieMeta/MovieMeta.svelte';
	import Trailer from '../TrailerComponent/Trailer.svelte';

	export let selectedMovie;
	export let trailer;

	let isModalOpen = false;
	let isTrailerModalOpen = false;

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
	<div class="flex w-full flex-col gap-4 py-4">
		<h2 class="text-xl font-semibold md:text-2xl lg:text-4xl">{selectedMovie.title}</h2>

		<MovieMeta {selectedMovie} />

		<div class=" flex flex-row items-start gap-3">
			<button
				class="flex w-fit cursor-pointer flex-row items-center justify-center gap-1 rounded-lg bg-white px-3 py-1 font-semibold text-black transition-colors hover:bg-white/80 md:py-2"
				onclick={() => (isTrailerModalOpen = true)}
			>
				<svg class="size-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
							stroke="#000000"
							stroke-width="2"
							stroke-linejoin="round"
						></path>
					</g></svg
				>
				Trailer
			</button>

			<button
				aria-label="Open movie information modal"
				class="group flex aspect-square size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white"
				onclick={() => (isModalOpen = true)}
			>
				<svg
					class="size-7 transition-colors duration-200 group-hover:stroke-black"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<circle
							cx="12"
							cy="12"
							r="10"
							class="group-hover:stroke-black"
							stroke="white"
							stroke-width="1.5"
						></circle>
						<path
							d="M12 17V11"
							stroke="white"
							class="group-hover:stroke-black"
							stroke-width="1.5"
							stroke-linecap="round"
						></path>
						<circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="white"></circle>
					</g></svg
				>
			</button>

			<button
				aria-label="Open movie information modal"
				class="group flex aspect-square size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white"
				onclick={() => (isModalOpen = true)}
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
							class="bg-main-btn rounded-lg px-3 py-1 text-white"
						>
							{provider.provider_name}
						</a>
					{/each}
					{#each selectedMovie.providers.GB.rent || [] as provider}
						<a
							href={selectedMovie.providers.GB.link || '#'}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-main-btn rounded-lg px-3 py-1 text-white"
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
				class="bg-main-btn hover:bg-main-btn/80 w-fit rounded-lg px-3 py-1 text-white transition"
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
	director={movieDirector}
	{productionCompanies}
/>

<Trailer {trailer} isOpen={isTrailerModalOpen} onClose={() => (isTrailerModalOpen = false)} />
