<script lang="ts">
	import Trailer from '$lib/components/TrailerComponent/Trailer.svelte';

	export let selectedMovie;
	export let trailer;
</script>

<div class="flex w-full flex-row items-center gap-2">
	<Trailer {trailer} />
	<span>|</span>

	{#each [selectedMovie?.original_language?.toUpperCase() ?? '', `${selectedMovie?.runtime ?? 'N/A'} min`, selectedMovie?.genres
			?.map((g) => g.name)
			.join(', ') ?? ''] as item, i}
		<p>{item}{i < 2 ? ' | ' : ''}</p>
	{/each}
</div>
