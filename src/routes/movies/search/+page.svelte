<script lang="ts">
	import SearchResults from '$lib/components/Search/SearchResults.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		document.title = 'Search For Movies | Flickerly';
	});
</script>

<section
	class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-6 p-5 pt-[8rem] xl:p-10 xl:pt-[10rem]"
>
	<SearchResults {data} />
</section>
