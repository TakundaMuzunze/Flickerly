<script lang="ts">
	import MovieSection from '$lib/components/sections/MovieSection.svelte';
	import { onMount } from 'svelte';
	export let data;

	onMount(() => {
		document.title = 'Browse Different Movies Genres | Flickerly';
	});
</script>

<section class="pt-[5rem] 2xl:pt-[8rem]">
	<MovieSection 
		title="Action Movies" 
		movies={data.actionMovies} 
		link="/genre/action" 
	/>
	<MovieSection 
		title="Comedy Movies" 
		movies={data.comedyMovies} 
		link="/genre/comedy" 
	/>
	<MovieSection 
		title="Drama Movies" 
		movies={data.dramaMovies} 
		link="/genre/drama" 
	/>
	<MovieSection 
		title="Thriller Movies" 
		movies={data.thrillerMovies} 
		link="/genre/thriller" 
	/>
	<MovieSection 
		title="Horror Movies" 
		movies={data.horrorMovies} 
		link="/genre/horror" 
	/>
	<MovieSection 
		title="Romance Movies" 
		movies={data.romanceMovies} 
		link="/genre/romance" 
	/>
	<MovieSection 
		title="Science Fiction Movies" 
		movies={data.scifiMovies} 
		link="/genre/science-fiction" 
	/>
	<MovieSection 
		title="Fantasy Movies" 
		movies={data.fantasyMovies} 
		link="/genre/fantasy" 
	/>
</section>
