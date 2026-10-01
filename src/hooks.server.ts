import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	console.info(
		'[request]',
		JSON.stringify({
			path: event.url.pathname,
			userAgent: event.request.headers.get('user-agent'),
			status: response.status
		})
	);

	return response;
};
