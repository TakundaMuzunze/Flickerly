<script lang="ts">
	export let providers: any;
	export let movieTitle: string;

	const googleWatchLink = `https://www.google.com/search?q=where+to+watch+${encodeURIComponent(movieTitle)}+UK`;
</script>

{#if providers?.GB?.flatrate || providers?.GB?.rent}
	<div class="text-main-btn flex flex-col gap-3">
		<p class="font-semibold">Available to stream or rent on:</p>
		<ul class="flex flex-wrap gap-2">
			{#each providers.GB.flatrate || [] as provider}
				<a
					href={providers.GB.link || '#'}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-main-btn rounded-lg px-3 py-1 text-white"
				>
					{provider.provider_name}
				</a>
			{/each}
			{#each providers.GB.rent || [] as provider}
				<a
					href={providers.GB.link || '#'}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-main-btn rounded-lg px-3 py-1 text-white"
				>
					{provider.provider_name}
				</a>
			{/each}
		</ul>
	</div>
{:else}
	<p class="text-main-btn w-fit font-semibold">No streaming options found in the UK.</p>
	<a
		href={googleWatchLink}
		target="_blank"
		rel="noopener noreferrer"
		class="bg-main-btn hover:bg-main-btn/80 w-fit rounded-lg px-3 py-1 text-white transition"
	>
		🔍 Find where to watch
	</a>
{/if}
