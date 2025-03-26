<script lang="ts">
	export let selectedMovie;
</script>

<div class="flex h-full w-full flex-col gap-5">
	<h2 class="text-2xl font-bold tracking-wide">Film Details:</h2>

	<section
		class="bg-secondary/40 flex h-full w-full flex-col gap-4 rounded-lg border border-white/10 p-5 shadow-md backdrop-blur-md"
	>
		<div class="grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-5 text-sm text-white">
			<div class="flex flex-col gap-0.5">
				<p class="text-sm text-gray-400">⏱️ Duration:</p>
				<p>{selectedMovie.runtime} min</p>
			</div>

			<div class="flex flex-col gap-0.5">
				<p class="text-sm text-gray-400">📅 Release:</p>
				<p>{new Date(selectedMovie.release_date).toLocaleDateString()}</p>
			</div>

			<div class="flex flex-col gap-0.5">
				<p class="text-sm text-gray-400">🎭 Genres:</p>
				<p>{selectedMovie.genres.map((g) => g.name).join(', ')}</p>
			</div>

			<div class="flex flex-col gap-0.5">
				<p class="text-sm text-gray-400">🌐 Language:</p>
				<p>{selectedMovie.original_language.toUpperCase()}</p>
			</div>

			{#if selectedMovie.production_countries?.length}
				<div class="flex flex-col gap-0.5">
					<p class="text-sm text-gray-400">📍 Country:</p>
					<p>{selectedMovie.production_countries.map((c) => c.name).join(', ')}</p>
				</div>
			{/if}

			{#if selectedMovie.tagline}
				<div class="flex flex-col gap-0.5">
					<p class="text-sm text-gray-400">📝 Tagline:</p>
					<p class="text-sm italic">"{selectedMovie.tagline}"</p>
				</div>
			{/if}
		</div>
	</section>
</div>
