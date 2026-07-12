<script lang="ts">
	let {
		title,
		description,
		href,
		ctaLabel,
		onRetry
	}: {
		title: string;
		description?: string;
		href?: string;
		ctaLabel?: string;
		onRetry?: () => void;
	} = $props();
</script>

<div class="flex min-h-64 w-full flex-col items-start justify-center gap-3 py-8" role="status">
	<h3 class="text-xl font-semibold text-white md:text-2xl">{title}</h3>
	{#if description}
		<p class="max-w-xl text-gray-300 md:text-lg">{description}</p>
	{/if}
	{#if onRetry}
		<button
			type="button"
			onclick={onRetry}
			class="mt-1 cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
		>
			Try again
		</button>
	{:else if href && ctaLabel}
		<a
			{href}
			class="mt-1 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
		>
			{ctaLabel}
		</a>
	{/if}
</div>
