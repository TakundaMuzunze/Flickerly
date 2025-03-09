<script lang="ts">
	import { setGenres } from '$lib/utils/genres';
	import '../app.css';

	export let data;
	const { genres } = data;

	setGenres(genres);
</script>

<slot />
