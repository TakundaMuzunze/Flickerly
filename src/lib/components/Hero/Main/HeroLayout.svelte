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
	<!-- Dark overlay -->
	<div class="absolute inset-0 bg-black/80"></div>

	<!-- Content Layout -->
	<div
		class="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-5 md:flex-row lg:gap-10"
	>
		<!-- Left: Title + Poster/Details -->
		<div
			class="flex h-full min-w-[250px] flex-col items-start justify-center gap-5 max-md:px-10 md:w-[35%]"
		>
			<slot name="title" />
			<slot name="details" />
		</div>

		<!-- Right: Carousel (Only if showCarousel) -->
		{#if showCarousel}
			<div class="max-md:w-full md:w-[55%]">
				<slot name="carousel" />
			</div>
		{/if}
	</div>
</section>
