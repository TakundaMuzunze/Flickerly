<script lang="ts">
	import { links } from '../../stores/navlinks.stores.svelte';
	import { fly } from 'svelte/transition';
	import SearchBar from '../Search/SearchBar.svelte';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header
	class="fixed top-0 z-50 flex w-full items-center justify-between px-10 py-5 text-white backdrop-blur-lg"
>
	<a href="/" class="text-2xl font-semibold md:text-3xl">Cinescope</a>

	<div class="flex items-center gap-4">
		<SearchBar />
		<button
			onclick={toggleMenu}
			aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
			class="cursor-pointer"
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
</header>

{#if isMenuOpen}
	<div
		role="button"
		aria-label="Close menu"
		tabindex="0"
		id="mobile-menu"
		class="fixed inset-0 z-[100] mx-auto bg-black/50 backdrop-blur-md"
		onclick={closeMenu}
		onkeydown={(event) => event.key === 'Escape' && closeMenu()}
	>
		<div
			transition:fly={{ x: 300, duration: 300 }}
			class="bg-body-colour fixed top-0 right-0 z-[101] h-full w-1/2 p-6 shadow-lg lg:w-[35%]"
		>
			<div class="flex justify-end">
				<button
					onclick={closeMenu}
					aria-label="Close navigation menu"
					class="cursor-pointer text-white"
				>
					<svg class="size-6" fill="currentColor" viewBox="0 0 384 512">
						<path
							d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						/>
					</svg>
				</button>
			</div>

			<nav class="mb-8 h-full">
				<ul class="flex h-full flex-col items-center justify-center gap-6">
					{#each links.navLinks as link}
						<li>
							<a href={link.href} onclick={closeMenu} class="block text-lg text-white">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{/if}
