<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

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

		if (timeoutId) clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			const trimmedQuery = searchInput.trim();
			const url = trimmedQuery
				? `/movies/search?q=${encodeURIComponent(trimmedQuery)}`
				: '/movies/search';

			goto(url, {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});

			timeoutId = null;
		}, 500);
	}

	function openSearch() {
		isBarOpen = true;
		setTimeout(() => inputElement?.focus(), 0);
	}

	function closeSearch() {
		isBarOpen = false;
		searchInput = '';
	}

	function clearInput() {
		searchInput = '';
		inputElement?.focus();
		goto('/movies/search', {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	}

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			if ($page.url.pathname !== '/movies/search') {
				closeSearch();
			}
		});

		return () => {
			unsubscribe();
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
		<button
			onclick={closeSearch}
			class="cursor-pointer text-white md:hidden"
			aria-label="Close search bar"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="size-4 fill-white">
				<path
					d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
					fill="currentColor"
				/>
			</svg>
		</button>

		<input
			bind:this={inputElement}
			class="w-full cursor-auto rounded-lg border border-white bg-white/10 p-2 text-sm text-white focus:outline-none"
			type="text"
			placeholder="Search for movies"
			bind:value={searchInput}
			oninput={handleSearch}
		/>

		{#if searchInput}
			<button
				onclick={clearInput}
				class="group absolute right-5 flex cursor-pointer items-center justify-center text-gray-400 hover:text-white"
				aria-label="Clear search bar input"
			>
				<svg class="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							class="group-hover:stroke-white"
							d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909"
							stroke="#99a1af"
							stroke-width="1.7"
							stroke-linecap="round"
						></path>
						<path
							d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6"
							stroke="#99a1af"
							stroke-width="1.7"
							stroke-linecap="round"
						></path>
					</g></svg
				>
			</button>
		{/if}
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
