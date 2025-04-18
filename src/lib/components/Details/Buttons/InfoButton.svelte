<script lang="ts">
	export let onClick: () => void;
</script>

<button
	aria-label="Open movie information modal"
	class="group flex aspect-square size-11 cursor-pointer items-center justify-center rounded-full bg-white/25 backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white"
	on:click={onClick}
>
	<svg
		class="size-7 transition-colors duration-200 group-hover:stroke-black"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g><g id="SVGRepo_iconCarrier">
			<circle
				cx="12"
				cy="12"
				r="10"
				class="group-hover:stroke-black"
				stroke="white"
				stroke-width="1.5"
			></circle>
			<path
				d="M12 17V11"
				stroke="white"
				class="group-hover:stroke-black"
				stroke-width="1.5"
				stroke-linecap="round"
			></path>
			<circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="white"></circle>
		</g></svg
	>
</button>
