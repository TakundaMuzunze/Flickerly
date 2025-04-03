<script lang="ts">
	export let isOpen: boolean;
	export let onClose: () => void;
	export let title: string;
	export let subtitle: string;
	export let content: string;
	export let releaseDate: string;
	export let director: string;
	export let productionCompanies: string;

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
	<div
		role="button"
		tabindex="0"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div
			class="relative max-h-[80vh] w-full max-w-72 overflow-y-auto rounded-lg bg-gray-900 p-6 shadow-xl md:max-w-2xl"
		>
			<button
				class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
				onclick={onClose}
				aria-label="Close modal"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<div class="mb-4 flex flex-col gap-2">
				<h2 class="text-2xl font-bold">{title}</h2>
				{#if subtitle}
					<p class="text-gray-400">{subtitle}</p>
				{/if}
			</div>
			<p class="mb-4 whitespace-pre-wrap text-gray-300">{content}</p>
			<div class="flex flex-col gap-2">
				{#if releaseDate}
					<p class="text-gray-400">Release Date: {releaseDate}</p>
				{/if}
				<p class="text-gray-400">Director: {director}</p>
				<p class="text-gray-400">Production: {productionCompanies}</p>
			</div>
		</div>
	</div>
{/if}
