<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FilterBar from './FilterBar.svelte';

	const { Story } = defineMeta({
		component: FilterBar,
		title: 'Components/Filters',
		tags: ['autodocs']
	});
</script>

<Story name="Filtering Bar" />
