<script lang="ts">
	export let isOpen = false;
	export let onClose: () => void;
	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let content: string | undefined = undefined;

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
			class="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-gray-900 p-6 shadow-xl"
		>
			<button
				class="absolute top-4 right-4 text-gray-400 hover:text-white"
				onclick={onClose}
				aria-label="Close modal"
			>
				✕
			</button>

			<div class="mb-4">
				<h2 class="text-2xl font-bold">{title}</h2>
				{#if subtitle}
					<p class="text-gray-400">{subtitle}</p>
				{/if}
			</div>
			{#if content}
				<p class="whitespace-pre-wrap text-gray-300">{content}</p>
			{/if}
		</div>
	</div>
{/if}
