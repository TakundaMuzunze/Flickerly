import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response(
		`User-agent: *
Allow: /
Sitemap: https://flickerly.netlify.app/sitemap.xml

# Crawl-delay
Crawl-delay: 10

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Allow all other routes
Allow: /movies/
Allow: /genre/
Allow: /watchlist/
Allow: /trending/
Allow: /topRated/
Allow: /inCinemas/`,
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
}; 