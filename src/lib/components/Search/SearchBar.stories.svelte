<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchBar from './SearchBar.svelte';

	const { Story } = defineMeta({
		component: SearchBar,
		title: 'Components/Search Bar',
		tags: ['autodocs']
	});
</script>

<Story name="Search Bar Tab" />
