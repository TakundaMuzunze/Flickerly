<script lang="ts">
	import Action from '$lib/components/ActionSection/Action.svelte';
	import Comedy from '$lib/components/ComedySection/Comedy.svelte';
	import Thriller from '$lib/components/ThrillerSection/Thriller.svelte';
	import Drama from '$lib/components/DramaSection/Drama.svelte';
	import Horror from '$lib/components/HorrorSection/Horror.svelte';
	import SciFi from '$lib/components/scienceFictionSection/Sci-Fi.svelte';
	import Romance from '$lib/components/RomanceSection/Romance.svelte';
	import Fantasy from '$lib/components/FantasySection/Fantasy.svelte';
	export let data;
</script>

<section class="pt-[8rem]">
	<Action actionMovies={data.actionMovies} />
	<Comedy comedyMovies={data.comedyMovies} />
	<Drama dramaMovies={data.dramaMovies} />
	<Thriller thrillerMovies={data.thrillerMovies} />
	<Horror horrorMovies={data.horrorMovies} />
	<Romance romanceMovies={data.romanceMovies} />
	<SciFi scifiMovies={data.scifiMovies} />
	<Fantasy fantasyMovies={data.fantasyMovies} />
</section>
