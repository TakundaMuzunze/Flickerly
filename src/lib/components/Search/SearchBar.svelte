<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let searchInput = '';
	let isBarOpen = false;
	let timeoutId: number | null = null;
	let inputElement: HTMLInputElement;

	$: if ($page.url.pathname !== '/movies/search') {
		searchInput = '';
	}

	function handleSearch(event: Event) {
		const input = event.target as HTMLInputElement;
		searchInput = input.value;

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Set a new timeout to update the URL after typing stops
		timeoutId = setTimeout(() => {
			const trimmedQuery = searchInput.trim();
			if (trimmedQuery) {
				goto(`/movies/search?q=${encodeURIComponent(trimmedQuery)}`, {
					replaceState: true,
					noScroll: true,
					keepFocus: true
				});
			} else {
				goto('/movies/search', {
					replaceState: true,
					noScroll: true,
					keepFocus: true
				});
			}
			timeoutId = null; // Reset timeoutId after URL update
		}, 500);
	}

	function openSearch() {
		isBarOpen = true;
		// Focus the input when opening the search
		if (inputElement) {
			setTimeout(() => inputElement.focus(), 0);
		}
	}

	function closeSearch() {
		isBarOpen = false;
		searchInput = '';
	}

	onMount(() => {
		// Only set input from URL when first mounting on /movies/search
		if ($page.url.pathname === '/movies/search') {
			const urlQuery = $page.url.searchParams.get('q') || '';
			searchInput = urlQuery;
		}

		// Cleanup any timeout when unmounting
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});
</script>

<div class="relative flex items-center">
	<button
		aria-label="Expand search bar"
		class="cursor-pointer"
		onclick={openSearch}
		class:hidden={isBarOpen}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="size-6" viewBox="0 0 512 512">
			<path
				d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
			/>
		</svg>
	</button>

	<div
		class="flex items-center gap-2 transition-all duration-300 ease-in-out {isBarOpen
			? 'max-sm:bg-body-colour w-64 rounded-lg p-2 opacity-100 max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:left-0 max-sm:z-50 max-sm:w-full max-sm:border-b max-sm:border-white/10 max-sm:p-4 max-sm:backdrop-blur-lg md:relative md:opacity-100'
			: 'pointer-events-none w-0 opacity-0'}"
	>
		<input
			bind:this={inputElement}
			class="w-full cursor-auto rounded-lg border border-white bg-white/10 p-2 text-sm text-white focus:outline-none"
			type="text"
			placeholder="Search for movies"
			bind:value={searchInput}
			oninput={handleSearch}
		/>
		<button aria-label="Close search" onclick={closeSearch} class="cursor-pointer text-white">
			<svg fill="white" class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
				<path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.hidden {
		display: none;
	}

	.transition-all {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}
</style>
