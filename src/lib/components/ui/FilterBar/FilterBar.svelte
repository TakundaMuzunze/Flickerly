<script lang="ts">
	import { sortMovies } from '$lib/stores/movieStore.stores.svelte';
	import { fade, scale } from 'svelte/transition';

	type SortOptionKey = 'popularity' | 'rating' | 'release_desc' | 'release_asc';

	const sortLabels: Record<SortOptionKey, string> = {
		popularity: 'Most Popular',
		rating: 'Highest Rated',
		release_desc: 'Newest First',
		release_asc: 'Oldest First'
	};

	let isFilterOpen = $state(false);
	let currentSort = $state<SortOptionKey>('popularity');

	function toggleSortBar(): void {
		isFilterOpen = !isFilterOpen;
	}

	function handleSort(option: SortOptionKey): void {
		currentSort = option;
		sortMovies(option);
		isFilterOpen = false;
	}
</script>

<div class="relative">
	<button
		tabindex="0"
		aria-label="Open sort filter bar"
		onclick={toggleSortBar}
		class="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-lg text-white"
	>
		<span>Sort By: {sortLabels[currentSort]}</span>
		<svg
			class="size-4 transition-transform duration-200"
			class:rotate-180={isFilterOpen}
			fill="white"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
		>
			<path
				d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
			/>
		</svg>
	</button>

	{#if isFilterOpen}
		<div class=" mt-2 w-48 rounded-lg bg-white p-2 shadow-lg" transition:fade|local>
			<button
				class="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
				onclick={() => handleSort('popularity')}
			>
				<span>Most Popular</span>
				{#if currentSort === 'popularity'}
					<svg
						class="size-4"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
						/>
					</svg>
				{/if}
			</button>
			<button
				class="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
				onclick={() => handleSort('rating')}
			>
				<span>Highest Rated</span>
				{#if currentSort === 'rating'}
					<svg
						class="size-4"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
						/>
					</svg>
				{/if}
			</button>
			<button
				class="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
				onclick={() => handleSort('release_desc')}
			>
				<span>Newest First</span>
				{#if currentSort === 'release_desc'}
					<svg
						class="size-4"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
						/>
					</svg>
				{/if}
			</button>
			<button
				class="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
				onclick={() => handleSort('release_asc')}
			>
				<span>Oldest First</span>
				{#if currentSort === 'release_asc'}
					<svg
						class="size-4"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
						/>
					</svg>
				{/if}
			</button>
		</div>
	{/if}
</div>
