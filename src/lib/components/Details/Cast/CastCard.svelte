<script lang="ts">
	export let actor;
</script>

<div class="flex max-w-36 flex-col items-start rounded-full lg:max-w-48">
	<img
		src={actor.profile_path
			? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
			: '/Frame.png'}
		alt="Actor headshot"
		class="aspect-square rounded-full object-cover object-center"
	/>
	<div class="mt-3 w-full">
		<div class="flex flex-col items-center justify-center gap-1 text-center text-wrap">
			<p class="font-semibold text-white lg:text-lg">{actor.name}</p>
			{#if actor.character}
				<p class=" text-sm text-gray-400">as {actor.character}</p>
			{/if}
		</div>
	</div>
</div>
