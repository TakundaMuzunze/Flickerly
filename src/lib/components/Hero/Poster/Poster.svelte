<script lang="ts">
	export let selectedMovie;
</script>

<div class="flex w-full flex-col items-start justify-start gap-4">
	{#if selectedMovie}
		<div>
			<h1 class="text-3xl font-semibold">Your Next Favorite Movie is One Click Away 🎥</h1>
		</div>

		<!-- <img
			class="h-64 self-center md:self-start"
			src={`https://image.tmdb.org/t/p/w400${selectedMovie.poster_path}`}
			alt={selectedMovie.title}
		/> -->

		<div class="flex w-full flex-col gap-2 py-4">
			<h2 class="text-xl">{selectedMovie.title}</h2>
			<p class="font-normal">⭐ {selectedMovie.vote_average.toFixed(1)} /10</p>
			<p class="text-base font-normal">{selectedMovie.overview}</p>

			{#if selectedMovie.providers?.GB?.flatrate || selectedMovie.providers?.GB?.rent}
				<div class="text-accent mt-2 flex flex-col gap-3">
					<p class="font-semibold">Available to stream or rent on:</p>
					<ul class="flex flex-wrap gap-2">
						{#each selectedMovie.providers.GB.flatrate as provider}
							<a
								href={selectedMovie.providers.GB.link || '#'}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-main-btn rounded-2xl px-2 py-1 text-sm text-white"
							>
								{provider.provider_name}
							</a>
						{/each}
						{#each selectedMovie.providers.GB.rent || [] as provider}
							<a
								href={selectedMovie.providers.GB.link || '#'}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-main-btn rounded-2xl px-3 py-1 text-sm text-white"
							>
								{provider.provider_name}
							</a>
						{/each}
					</ul>
				</div>
			{:else}
				<p class="text-base text-white">Not available for streaming in the UK</p>
			{/if}
		</div>
	{/if}
</div>
