<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
	export let isLoading: boolean;
	export let onPageChange: (page: number) => void;
</script>

{#if totalPages > 1}
	<div class="flex items-center justify-center gap-2 w-full mt-8">
		<button
			class="px-4 py-2 rounded-md bg-gray-800 text-white disabled:opacity-50"
			disabled={currentPage === 1 || isLoading}
			on:click={() => onPageChange(currentPage - 1)}
		>
			Previous
		</button>
		<span class="text-white">
			Page {currentPage} of {totalPages}
		</span>
		<button
			class="px-4 py-2 rounded-md bg-gray-800 text-white disabled:opacity-50"
			disabled={currentPage === totalPages || isLoading}
			on:click={() => onPageChange(currentPage + 1)}
		>
			Next
		</button>
	</div>
{/if} 