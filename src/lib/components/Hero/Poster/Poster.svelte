<script lang="ts">
	export let selectedMovie;
</script>

<div class="w-full">
	{#if selectedMovie}
		<img
			src={`https://image.tmdb.org/t/p/w400${selectedMovie.poster_path}`}
			alt={selectedMovie.title}
		/>

		<div class="flex flex-col gap-2 py-4">
			<h2 class="text-xl">{selectedMovie.title}</h2>
			<!-- <p class="font-normal">⭐ {selectedMovie.vote_average.toFixed(1)} /10</p> -->
			<p class="text-base font-normal">{selectedMovie.overview}</p>

			{#if selectedMovie.providers?.GB?.flatrate || selectedMovie.providers?.GB?.rent}
				<div class="text-accent mt-2 flex flex-col gap-3">
					<p class="font-semibold">Available to stream or rent on:</p>
					<div class="flex flex-wrap gap-2">
						{#each selectedMovie.providers.GB.flatrate || [] as provider}
							<button class="bg-main-btn rounded-2xl px-3 py-1 text-sm font-normal text-white">
								{provider.provider_name}
							</button>
						{/each}

						{#each selectedMovie.providers.GB.rent || [] as provider}
							<button class="bg-main-btn rounded-2xl px-3 py-1 text-sm font-normal text-white">
								{provider.provider_name} (Rent)
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<p class="text-sm text-white">Not available for streaming in the UK</p>
			{/if}
		</div>
	{/if}
</div>
