<script lang="ts">
	export let onClick: () => void;
</script>

<div class="justfy-cetner flex flex-col items-center gap-3">
	<button
		class="group flex aspect-square size-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105"
		on:click={onClick}
		aria-label="Share on X/Twitter"
	>
		<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
			><path
				d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
			/></svg
		>
	</button>
	<p class="text-xs">X</p>
</div>
