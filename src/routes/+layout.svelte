<script lang="ts">
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import toast, { Toaster } from 'svelte-hot-french-toast';
	import { setGenres } from '$lib/utils/genres';
	import '../app.css';

	export let data;
	const { genres } = data;

	setGenres(genres);
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>

<Toaster />
