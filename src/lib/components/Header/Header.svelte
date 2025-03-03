<script lang="ts">
	import { links } from '../../stores/navlinks.stores.svelte';
	import MobileMenu from '../MobileNav/MobileMenu.svelte';
	import SearchBar from '../SearchBar/SearchBar.svelte';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = true;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="z-50 flex w-full items-center justify-between p-5 text-white md:justify-normal">
	<div class="w-1/4 flex-shrink-0">
		<a href="/" class="text-xl font-semibold">Cinescope</a>
	</div>

	<nav class="mx-auto hidden w-1/4 md:block">
		<ul class="flex justify-center gap-6">
			{#each links.navLinks as link}
				<li>
					<a href={link.href} class="text-lg transition-opacity hover:opacity-75">
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="ml-auto flex items-center gap-4">
		<SearchBar />

		<!-- Hamburger Button for Mobile -->
		<button
			onclick={toggleMenu}
			aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
			class="cursor-pointer md:hidden"
		>
			{#if isMenuOpen}
				<svg class="size-6" fill="currentColor" viewBox="0 0 384 512">
					<path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
					/>
				</svg>
			{:else}
				<svg class="size-6" fill="currentColor" viewBox="0 0 448 512">
					<path
						d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
					/>
				</svg>
			{/if}
		</button>
	</div>

	<MobileMenu {isMenuOpen} {closeMenu} />
</header>
