<script lang="ts">
	import Trailer from '$lib/components/TrailerComponent/Trailer.svelte';

	export let selectedMovie;
	export let trailer;

	const genreNames = selectedMovie?.genres?.map((g) => g.name) ?? [];
</script>

{#if selectedMovie}
	<div class="flex w-full flex-row items-center gap-2">
		<Trailer {trailer} />
		<span>|</span>

		{#each [selectedMovie?.original_language?.toUpperCase() ?? '', `${selectedMovie?.runtime ?? 'N/A'} min`, genreNames.join(', ') || 'N/A'] as item, i}
			<p>{item}{i < 2 ? ' | ' : ''}</p>
		{/each}
	</div>
{/if}
