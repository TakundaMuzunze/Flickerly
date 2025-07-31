<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Carousel from './Carousel.svelte';

	const { Story } = defineMeta({
		component: Carousel,
		title: 'Components/Hero/Carousel',
		tags: ['autodocs']
	});
</script>

<Story name="Carousel Component" />
