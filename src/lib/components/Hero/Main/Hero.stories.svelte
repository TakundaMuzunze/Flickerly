<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Hero from './Hero.svelte';

	const { Story } = defineMeta({
		component: Hero,
		title: 'Components/Hero',
		tags: ['autodocs']
	});
</script>

<Story name="Hero Section" />
