<script lang="ts">
	import ResultsGrid from '$lib/components/layout/Grids/ResultsGrid.svelte';
	export let data;
</script>

<section
	class="in-w-screen-2xl flex flex-col items-start justify-start gap-8 p-5 xl:p-10 xl:pt-[10rem]"
>
	<h2 class="relative text-xl font-semibold text-white md:text-2xl">Similar movies</h2>
	<ResultsGrid movies={data.similarMovies} />
</section>
