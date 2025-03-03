<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Poster from './Poster.svelte';

	const { Story } = defineMeta({
		component: Poster,
		title: 'Components/Movie Poster',
		tags: ['autodocs']
	});
</script>

<Story name="Movie Poster" />
