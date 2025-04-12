<script lang="ts">
	export let backgroundImage: string = '';
</script>

<section
	class="relative flex min-h-[75vh] w-full flex-col items-center justify-center bg-cover bg-center py-5 pt-[5rem] text-white md:px-8"
	style="background-image: {backgroundImage
		? `url(https://image.tmdb.org/t/p/original${backgroundImage})`
		: 'none'}"
>
	<div class="absolute inset-0 bg-black/80"></div>

	<div class="relative z-10 flex w-full max-w-7xl flex-col items-start justify-evenly p-5">
		<div class="grid w-full grid-cols-1 md:grid-cols-12 md:gap-8">
			<!-- Poster -->
			<div class="md:col-span-4 xl:col-span-3">
				<slot name="poster" />
			</div>

			<!-- Details -->
			<div class="md:col-span-8 xl:col-span-6">
				<slot name="details" />
			</div>

			<!-- Cast -->
			<div class="md:col-span-12 xl:col-span-3">
				<slot name="cast" />
			</div>
		</div>
	</div>
</section>

<div class="py-5">
	<slot name="similar" />
</div>

<!-- <section class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-10 p-10">
	<div class="flex w-full flex-col gap-5">
		<slot name="cast" />
	</div>
</section> -->
