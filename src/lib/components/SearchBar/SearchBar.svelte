<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchMovies } from '../../../routes/backend/fetchMovies';

	let query = $state('');
	let results = $state([]);
	let isBarOpen = $state(false);

	async function initiateSearch() {
		results = await fetchMovies(query);
	}

	function openSearch() {
		isBarOpen = true;
	}

	onMount(async () => {
		await initiateSearch();
	});
</script>

<div class="relative">
	<button aria-label="Expand search bar" class="cursor-pointer md:hidden" onclick={openSearch}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="size-6" viewBox="0 0 512 512"
			><path
				d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
			/></svg
		>
	</button>

	{#if isBarOpen}
		<div class="fixed top-0 left-0 z-50 flex h-full w-full flex-col">
			<div class="bg-body-colour flex w-full items-center gap-4 p-4">
				<input
					class="border-accent w-full rounded-2xl border p-3 text-lg text-white focus:outline-none"
					type="text"
					placeholder="Search Cinescope"
					bind:value={query}
				/>
				<button
					aria-label="Back to page"
					onclick={() => (isBarOpen = false)}
					class="cursor-pointer text-2xl text-white"
				>
					<svg fill="white" class="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
						><path
							d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
						/></svg
					>
				</button>
			</div>
		</div>
	{/if}
</div>

<div class="hidden md:block">
	<input
		class=" border-accent w-full rounded-2xl border bg-white/10 p-3 text-sm focus:outline-none"
		type="text"
		placeholder="Search Cinescope"
		bind:value={query}
	/>
</div>
