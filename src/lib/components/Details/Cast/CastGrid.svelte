<script lang="ts">
	import CastCard from './CastCard.svelte';

	export let cast;
</script>

<div class="flex flex-col gap-10">
	<div class="flex w-full items-center justify-between">
	<h3 class="text-2xl font-semibold text-white">Cast:</h3>
	<div
		class="flex w-full gap-4 overflow-x-auto scroll-smooth whitespace-nowrap lg:grid lg:grid-cols-4 lg:gap-8"
	>
		{#each cast.slice(0, 4) as actor}
			<div class="shrink-0">
				<CastCard {actor} />
			</div>
		{/each}
	</div>
</div>
