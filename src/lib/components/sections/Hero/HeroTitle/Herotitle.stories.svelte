<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HeroTitle from './HeroTitle.svelte';

	const { Story } = defineMeta({
		component: HeroTitle,
		title: 'Components/Hero',
		tags: ['autodocs']
	});
</script>

<Story name="Heading" />
