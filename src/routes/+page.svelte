<script>
	import Header from '$lib/components/Header/Header.svelte';
	import Hero from '$lib/components/Hero/Main/Hero.svelte';

	export let data;
</script>

<Header />
<Hero movies={data.movies} />
<Hero movies={data.movies} />
