<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MovieDetails from './MovieDetails.svelte';

	const { Story } = defineMeta({
		component: MovieDetails,
		title: 'Components/Details/Description',
		tags: ['autodocs']
	});
</script>

<Story name="Movie Desc" />
