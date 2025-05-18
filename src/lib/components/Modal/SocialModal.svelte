<script lang="ts">
	import toast from 'svelte-hot-french-toast';
	import Facebook from '../SocialMediaIcons/Facebook.svelte';
	import PageLink from '../SocialMediaIcons/PageLink.svelte';
	import X from '../SocialMediaIcons/X.svelte';

	export let isOpen: boolean;
	export let onClose: () => void;
	export let content: string;
	export let movieTitle: string;
	export let movieId: number;

	const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
	const shareText = `Check out ${movieTitle} on Flickerly!`;

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

	function shareOnFacebook() {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
		window.open(url, '_blank', 'width=600,height=400');
	}

	function shareOnX() {
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
		window.open(url, '_blank', 'width=600,height=400');
	}

	function copyPageLink() {
		navigator.clipboard.writeText(currentUrl);
		toast.success('Link copied to clipboard');
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
			class="relative max-h-[80vh] w-full max-w-80 overflow-y-auto rounded-lg bg-gray-900 p-6 shadow-xl md:max-w-2xl"
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

			<div class="mb-8 flex flex-col gap-2">
				<div class="flex flex-col items-center gap-5 max-md:pt-5">
					<h2 class="text-center text-2xl font-bold capitalize">Share movie with friends</h2>
					<hr class="w-10 text-gray-400" />
				</div>
			</div>
			<!-- <p class="mb-4 whitespace-pre-wrap text-gray-300">{content}</p> -->
			<div class="flex flex-row items-center justify-center gap-6 text-gray-400">
				<Facebook onClick={shareOnFacebook} />
				<X onClick={shareOnX} />
				<PageLink onClick={copyPageLink} />
			</div>
		</div>
	</div>
{/if}
