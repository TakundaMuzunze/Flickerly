<script lang="ts">
	export let trailer: { key: string; name: string } | null;
</script>

{#if trailer}
	<div class="flex flex-1 flex-col gap-5">
		<h3 class="text-2xl font-semibold text-white">Trailer:</h3>
		<iframe
			class="aspect-video w-[300px] rounded-xl md:w-[450px]"
			src={`https://www.youtube.com/embed/${trailer.key}`}
			title={trailer.name}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
{/if}
