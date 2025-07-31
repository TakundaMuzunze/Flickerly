<script lang="ts">
	import Footer from '$lib/components/layout/Footer/Footer.svelte';
	import Header from '$lib/components/layout/Header/Header.svelte';
	import toast, { Toaster } from 'svelte-hot-french-toast';
	import { setGenres } from '$lib/utils/genres';
	import { page } from '$app/stores';
	import '../app.css';

	export let data;
	const { genres } = data;

	setGenres(genres);

	// Default meta tags
	const description =
		'Discover, track, and explore movies and TV shows with Flickerly. Create personalized watchlists and find where to stream your favorite content.';
	const keywords = 'movies, tv shows, watchlist, streaming, discover movies, movie recommendations';
	const image = 'https://flickerly.netlify.app/og-image.jpg';
	const canonicalUrl = `https://flickerly.netlify.app${$page.url.pathname}`;
</script>

<svelte:head>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="Flickerly" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />

	<!-- Additional Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#000000" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="author" content="Flickerly" />

	<!-- Structured Data -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": "Flickerly",
			"url": "https://flickerly.netlify.app",
			"description": "Discover, track, and explore movies and TV shows with Flickerly. Create personalized watchlists and find where to stream your favorite content.",
			"applicationCategory": "Entertainment",
			"operatingSystem": "Web",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			}
		}
	</script>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>

<Toaster />
