<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import { setGenres } from '$lib/utils/genres';
	import '../app.css';

	export let data;
	const { genres } = data;

	setGenres(genres);
</script>

<Header />
<slot />
