<script lang="ts">
	export let backgroundImage: string = '';
</script>

<section
	class="relative flex min-h-[60vh] w-full flex-col items-center justify-center bg-cover bg-center py-5 pt-[5rem] text-white md:px-8"
	style="background-image: {backgroundImage
		? `url(https://image.tmdb.org/t/p/original${backgroundImage})`
		: 'none'}"
>
	<div class="absolute inset-0 bg-black/80"></div>

	<div class="relative z-10 flex w-full max-w-7xl flex-col items-start justify-between p-5">
		<div class="flex flex-col items-start gap-5 md:gap-8 xl:flex-row xl:items-center">
			<div class="w-1/4">
				<slot name="poster" />
			</div>
			<div class="lg:w-1/2">
				<slot name="details" />
			</div>
			<div class="w-full xl:w-1/4">
				<slot name="cast" />
			</div>
		</div>
	</div>
</section>

<!-- <section class="mx-auto flex max-w-7xl flex-col items-start justify-start gap-10 p-10">
	<div class="flex w-full flex-col gap-5">
		<slot name="cast" />
	</div>
</section> -->
