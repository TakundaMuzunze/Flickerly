<script lang="ts">
	import MovieSection from '$lib/components/sections/MovieSection.svelte';
	import { GENRE_PAGES, GENRE_SLUGS } from '$lib/constants/genres';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		document.title = 'Browse Different Movies Genres | Flickerly';
	});
</script>

<section class="pt-[5rem] 2xl:pt-[8rem]">
	{#each GENRE_SLUGS as slug}
		<MovieSection
			title={GENRE_PAGES[slug].title}
			movies={data.genres[slug]}
			link={`/genre/${slug}`}
		/>
	{/each}
</section>
