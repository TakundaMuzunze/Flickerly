// Header matching keeps ordinary visitors from invoking this edge function.
// Return here so blocked crawlers never reach the SvelteKit serverless function.
export default function blockCrawlers() {
	return new Response('Forbidden', {
		status: 403,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-store'
		}
	});
}

export const config = {
	path: '/*',
	header: {
		'user-agent': '(SERankingBacklinksBot|meta-externalagent)'
	}
};
