<script lang="ts">
	export let isMenuOpen: boolean;
	export let closeMenu: () => void;
	import { fly } from 'svelte/transition';
	import { links } from '../../stores/navlinks.stores.svelte';
</script>

{#if isMenuOpen}
	<div
		role="button"
		aria-label="Close menu"
		tabindex="0"
		id="mobile-menu"
		class="bg-opacity-50 fixed inset-0 z-40 backdrop-blur-sm"
		onclick={closeMenu}
		onkeydown={(event) => event.key === 'Escape' && closeMenu()}
	>
		<div
			transition:fly={{ x: 300, duration: 300 }}
			class="fixed top-0 right-0 z-50 h-full w-64 p-6 shadow-lg"
		>
			<div class="flex justify-end">
				<button onclick={closeMenu} aria-label="Close navigation menu" class="cursor-pointer">
					<svg class="size-6" fill="currentColor" viewBox="0 0 384 512">
						<path
							d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						/>
					</svg>
				</button>
			</div>

			<nav class="mt-8">
				<ul class="flex flex-col items-center justify-center gap-6">
					{#each links.navLinks as link}
						<li>
							<a href={link.href} onclick={closeMenu} class="block text-lg">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{/if}
