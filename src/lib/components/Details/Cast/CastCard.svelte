<script lang="ts">
	export let actor;
</script>

<div class="flex max-w-34 flex-col items-start rounded-full">
	<img
		src={actor.profile_path
			? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
			: '/Frame.png'}
		alt="Actor headshot"
		class="aspect-square rounded-full object-cover object-center"
	/>
	<!-- <div class="mt-3 w-full">
		<div class="flex flex-col items-start justify-center gap-1 text-wrap">
			<p class="font-semibold text-white lg:text-lg">{actor.name}</p>
			<p class=" text-sm text-gray-400">as {actor.character}</p>
		</div>
	</div> -->
</div>
