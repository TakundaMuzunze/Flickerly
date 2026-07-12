<script lang="ts">
	export let backgroundImage: string = '';

	let previewLoaded = false;
	let imageLoaded = false;

	$: previewUrl = backgroundImage ? `https://image.tmdb.org/t/p/w780${backgroundImage}` : '';
	$: imageUrl = backgroundImage ? `https://image.tmdb.org/t/p/original${backgroundImage}` : '';

	$: {
		void backgroundImage;
		previewLoaded = false;
		imageLoaded = false;
	}
</script>

<section
	class="min-w-screen-2xl relative flex min-h-screen w-full flex-col items-start justify-end overflow-hidden bg-zinc-900 py-5 pt-[5rem] text-white md:px-8"
>
	{#if previewUrl}
		<img
			src={previewUrl}
			alt=""
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500"
			class:opacity-0={!previewLoaded}
			class:opacity-100={previewLoaded}
			onload={() => (previewLoaded = true)}
		/>
	{/if}

	{#if imageUrl}
		<img
			src={imageUrl}
			alt=""
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
			class:opacity-0={!imageLoaded}
			class:opacity-100={imageLoaded}
			onload={() => (imageLoaded = true)}
		/>
	{/if}

	{#if backgroundImage && !previewLoaded && !imageLoaded}
		<div class="absolute inset-0 z-[1] flex items-center justify-center">
			<svg
				class="size-8 animate-spin text-white/70"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		</div>
	{/if}

	<div class="absolute inset-0 z-[1] bg-black/50"></div>

	<div class="relative z-10 flex w-full max-w-7xl flex-col items-start justify-evenly p-5">
		<div class="grid w-full grid-cols-1 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-8 xl:col-span-6">
				<slot name="details" />
			</div>
		</div>
	</div>
</section>

<section class="min-w-screen-2xl mx-auto flex flex-col items-start justify-start gap-4 p-5 xl:p-10">
	<div class="flex w-full flex-col gap-5">
		<h2 class="relative text-xl font-semibold text-white md:text-2xl">Cast</h2>
		<slot name="cast" />
	</div>
</section>

<slot name="similar" />
