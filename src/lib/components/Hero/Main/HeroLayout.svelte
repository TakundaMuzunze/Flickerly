<script lang="ts">
	export let backgroundImage: string = '';
	export let showCarousel: boolean = false;
</script>

<section
	class="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center py-5 pt-[5rem] text-white md:px-8"
	style="background-image: {backgroundImage
		? `url(https://image.tmdb.org/t/p/original${backgroundImage})`
		: 'none'}"
>
	<div class="absolute inset-0 bg-black/80"></div>

	<div
		class="min-w-screen-2xl relative z-10 flex w-full flex-col items-center justify-center gap-5 max-lg:items-start lg:flex-row lg:justify-between lg:gap-10"
	>
		<div
			class="flex h-full min-w-[250px] flex-col items-start justify-center gap-5 max-md:px-5 lg:w-[35%]"
		>
			<slot name="details" />
		</div>

		{#if showCarousel}
			<div class="w-full max-w-6xl px-5 max-md:w-full lg:w-[55%]">
				<slot name="carousel" />
			</div>
		{/if}
	</div>
</section>
