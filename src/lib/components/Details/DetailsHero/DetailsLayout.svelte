<script lang="ts">
	export let backgroundImage: string = '';
</script>

<section
	class="relative flex min-h-[60-vh] w-full flex-col items-center justify-center bg-cover bg-center py-5 pt-[5rem] text-white md:px-8"
	style="background-image: {backgroundImage
		? `url(https://image.tmdb.org/t/p/original${backgroundImage})`
		: 'none'}"
>
	<!-- Dark overlay -->
	<div class="absolute inset-0 bg-black/80"></div>

	<!-- Content Layout -->
	<div class="relative z-10 flex w-full max-w-5xl flex-col items-start justify-evenly gap-20 p-5">
		<div class="flex flex-col items-start gap-5 md:flex-row lg:items-center lg:gap-10">
			<slot name="poster" />
			<slot name="details" />
		</div>
	</div>
</section>

<section class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-10 p-10">
	<div class="flex w-full flex-col gap-5">
		<slot name="cast" />
	</div>
</section>
