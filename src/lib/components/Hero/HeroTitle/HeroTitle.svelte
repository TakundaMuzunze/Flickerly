<script lang="ts">
	import { heroTitles } from '$lib/types/timeRanges';
	import { onMount } from 'svelte';

	let headingText: string = '';

	onMount(() => {
		const hour = new Date().getHours();
		const current = heroTitles.find((range) => hour >= range.start && hour <= range.end);
		headingText = current?.heading ?? 'Discover Your Next Favorite Movie 🎥';
	});
</script>

<div>
	<h1 class="text-2xl font-semibold md:text-3xl">{headingText}</h1>
</div>
