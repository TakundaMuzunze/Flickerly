<script lang="ts">
	import type { Trailer } from '$lib/types/trailer';

	export let trailer: Trailer | null;
	export let isOpen: boolean = false;
	export let onClose: () => void;

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		tabindex="0"
		role="button"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div
			tabindex="0"
			role="button"
			class="bg-body-colour relative w-full max-w-76 rounded-lg p-10 md:max-w-2xl lg:max-w-3xl"
			onclick={(e) => e.stopPropagation()}
		>
			<button
				class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
				onclick={onClose}
				aria-label="Close"
			>
				✕
			</button>
			<h2 class="mb-8 text-2xl font-bold">Movie Trailer</h2>
			{#if trailer}
				<iframe
					class="aspect-video w-full rounded-lg"
					src={`https://www.youtube.com/embed/${trailer.key}`}
					title={trailer.name}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else}
				<div class="flex flex-col items-center justify-center gap-4 p-8 text-center">
					<svg class="size-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2zm0 4h4v2h-4v-2z"/>
					</svg>
					<h3 class="text-xl font-semibold text-white">No Trailer Available</h3>
					<p class="text-gray-400">We couldn't find a trailer for this movie. Check back later or explore other movies.</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
