<script lang="ts">
	export let selectedMovie;

	const genreNames = selectedMovie?.genres?.map((g) => g.name) ?? [];
	const runtime = selectedMovie?.runtime ? `${selectedMovie.runtime} min` : 'N/A';
	const voteRating = selectedMovie?.vote_average
		? `⭐ ${selectedMovie.vote_average.toFixed(1)}/10`
		: 'N/A';
	$: releaseYear = selectedMovie?.release_date ? new Date(selectedMovie.release_date).getFullYear() : 'N/A';
</script>

{#if selectedMovie}
	<div class="flex w-full flex-col gap-2">
		<div class="flex flex-row flex-wrap items-center gap-2">
			{#each [voteRating, releaseYear, runtime, selectedMovie?.original_language?.toUpperCase() ?? 'N/A'] as item, i}
				<span class="flex items-center gap-2">
					<span class="text-sm text-gray-300 md:text-lg">{item}</span>
					{#if i < 3}
						<span class="size-1 rounded-full bg-gray-300"></span>
					{/if}
				</span>
			{/each}
		</div>

		<div class="flex flex-row flex-wrap items-center gap-2">
			{#each genreNames as genre, i}
				<span class="flex items-center gap-2">
					<span class="text-sm text-gray-300 md:text-lg">{genre}</span>
					{#if i < genreNames.length - 1}
						<span class="size-1 rounded-full bg-gray-300"></span>
					{/if}
				</span>
			{/each}
		</div>
	</div>
{/if}
