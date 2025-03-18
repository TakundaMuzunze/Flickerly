<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MovieDetails from './MovieDetails.svelte';

	const { Story } = defineMeta({
		component: MovieDetails,
		title: 'Components/Details',
		tags: ['autodocs']
	});
</script>

<Story name="Details" />
