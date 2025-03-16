<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Footer from './Footer.svelte';

	const { Story } = defineMeta({
		component: Footer,
		title: 'Components/Footer',
		tags: ['autodocs']
	});
</script>

<Story name="Footer Component" />
