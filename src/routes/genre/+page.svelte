<script lang="ts">
	import Action from '$lib/components/ActionSection/Action.svelte';
	import Comedy from '$lib/components/ComedySection/Comedy.svelte';
	import Thriller from '$lib/components/ThrillerSection/Thriller.svelte';
	import Drama from '$lib/components/DramaSection/Drama.svelte';
	import Horror from '$lib/components/HorrorSection/Horror.svelte';
	import SciFi from '$lib/components/scienceFictionSection/Sci-Fi.svelte';
	export let data;
</script>

<section class="mx-auto flex flex-col items-start justify-start pt-[8rem] xl:pt-[10rem]">
	<Action actionMovies={data.actionMovies} />
	<Thriller thrillerMovies={data.thrillerMovies} />
	<Comedy comedyMovies={data.comedyMovies} />
	<Drama dramaMovies={data.dramaMovies} />
	<Horror horrorMovies={data.horrorMovies} />
	<SciFi scifiMovies={data.scifiMovies} />
</section>
