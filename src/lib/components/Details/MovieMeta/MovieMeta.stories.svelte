<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MovieMeta from './MovieMeta.svelte';

	const { Story } = defineMeta({
		component: MovieMeta,
		title: 'Components/Details/Meta Information',
		tags: ['autodocs']
	});
</script>

<Story name="Movie Overview" />
