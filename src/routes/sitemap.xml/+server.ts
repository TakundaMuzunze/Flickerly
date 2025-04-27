import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://flickerly.netlify.app';
	const routes = [
		'',
		'/movies',
		'/genre',
		'/watchlist',
		'/trending',
		'/topRated',
		'/inCinemas'
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${routes
		.map(
			(route) => `
	<url>
		<loc>${baseUrl}${route}</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}; 