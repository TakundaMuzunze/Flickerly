<script lang="ts">
	export let onClick: () => void;
</script>

<div class="group relative w-fit">
	<button
		class="flex w-fit cursor-pointer flex-row items-center justify-center gap-1 rounded-lg bg-white px-3 py-1 font-semibold text-black transition-colors hover:bg-white/80 md:py-2"
		on:click={onClick}
	>
		<svg class="size-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
			><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g><g id="SVGRepo_iconCarrier">
				<path
					d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
					stroke="#000000"
					stroke-width="2"
					stroke-linejoin="round"
				></path>
			</g></svg
		>
		Trailer
	</button>

	<span
		class="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 scale-0 transform rounded-md bg-white px-3 py-1 font-medium whitespace-nowrap text-black opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
	>
		View trailer
	</span>
</div>
