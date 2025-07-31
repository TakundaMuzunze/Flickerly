<script lang="ts">
	import { getDirector } from '$lib/utils/movieCrew';
	import { getProductionCompany } from '$lib/utils/productionCompanies';
	import MovieMeta from './MovieMeta/MovieMeta.svelte';
	import Trailer from '../TrailerComponent/Trailer.svelte';
	import TrailerButton from './Buttons/TrailerButton.svelte';
	import InfoButton from './Buttons/InfoButton.svelte';
	import WatchlistButton from './Buttons/WatchlistButton.svelte';
	import StreamingProviders from './StreamingProviders/StreamingProviders.svelte';
	import ShareButton from './Buttons/ShareButton.svelte';
	import Modal from '$lib/components/ui/Modals/Modal.svelte';
	import SocialModal from '$lib/components/ui/Modals/SocialModal.svelte';

	export let selectedMovie;
	export let trailer;

	let isModalOpen = false;
	let isSocialModalOpen = false;
	let isTrailerModalOpen = false;

	$: movieDirector = getDirector(selectedMovie.credits?.crew);
	$: productionCompanies = getProductionCompany(selectedMovie.production_companies);
	$: certification = selectedMovie.certification;

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

		<div class="flex flex-row items-start gap-3">
			<TrailerButton onClick={() => (isTrailerModalOpen = true)} />
			<InfoButton onClick={() => (isModalOpen = true)} />
			<WatchlistButton movie={selectedMovie} />
			<ShareButton onClick={() => (isSocialModalOpen = true)} />
		</div>

		<StreamingProviders providers={selectedMovie.providers} movieTitle={selectedMovie.title} />
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
	{certification}
/>

<SocialModal
	isOpen={isSocialModalOpen}
	movieTitle={selectedMovie.title}
	movieId={selectedMovie.id}
	onClose={() => (isSocialModalOpen = false)}
/>

<Trailer {trailer} isOpen={isTrailerModalOpen} onClose={() => (isTrailerModalOpen = false)} />
