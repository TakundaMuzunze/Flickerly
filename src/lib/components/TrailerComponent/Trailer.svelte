<script lang="ts">
	import type { Trailer } from '$lib/types/trailer';

	export let trailer: Trailer | null;

	let isModalOpen: boolean = false;

	function openModal() {
		isModalOpen = !isModalOpen;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<button
	onclick={openModal}
	class="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md"
	><svg fill="white" class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
		><path
			d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
		/></svg
	>Trailer</button
>

{#if isModalOpen && trailer}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		tabindex="0"
		role="button"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
		onclick={closeModal}
	>
		<div
			tabindex="0"
			role="button"
			class="bg-body-colour relative w-full max-w-76 rounded-lg p-10 md:max-w-2xl lg:max-w-3xl"
			onclick={(e) => e.stopPropagation()}
		>
			<button
				class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
				onclick={closeModal}
				aria-label="Close"
			>
				✕
			</button>
			<h2 class="mb-8 text-2xl font-bold">Movie Trailer</h2>
			<iframe
				class="aspect-video w-full rounded-lg"
				src={`https://www.youtube.com/embed/${trailer.key}`}
				title={trailer.name}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
{/if}
