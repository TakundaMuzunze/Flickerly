<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchMovies } from '../../../routes/backend/fetchMovies';

	let query = $state('');
	let results = $state([]);

	async function initiateSearch() {
		results = await fetchMovies(query);
	}

	onMount(async () => {
		await initiateSearch();
	});
</script>

<div class="w-full">
	<input
		class="focus:border-accent w-full rounded-lg border border-gray-300 bg-white/10 p-2 p-3 text-sm focus:outline-none"
		type="text"
		placeholder="Search for a movie..."
		bind:value={query}
	/>
</div>
