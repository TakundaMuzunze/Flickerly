<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Cast from './CastCard.svelte';

	const { Story } = defineMeta({
		component: Cast,
		title: 'Components/Details/Cast',
		tags: ['autodocs']
	});
</script>

<Story name="Cast List" />
