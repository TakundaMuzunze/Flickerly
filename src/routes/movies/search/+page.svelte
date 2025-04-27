<script lang="ts">
	import SearchResults from '$lib/components/Search/SearchResults.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		document.title = 'Search For Movies | Flickerly';
	});
</script>

<section class=" xl:p-10">
	<SearchResults {data} />
</section>
