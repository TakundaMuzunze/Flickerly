<script lang="ts">
	import CastCard from './CastCard.svelte';

	export let cast;
</script>

<div
	class="flex w-full gap-6 overflow-x-auto scroll-smooth whitespace-nowrap 2xl:grid 2xl:grid-cols-8 2xl:gap-0"
>
	{#each cast.slice(0, 8) as actor}
		<div class="shrink-0">
			<CastCard {actor} />
		</div>
	{/each}
</div>
