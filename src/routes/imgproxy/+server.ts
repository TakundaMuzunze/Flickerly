// import { error } from '@sveltejs/kit';

// export async function GET({ url }) {
// 	const posterPath = url.searchParams.get('src');

// 	console.log('📦 Incoming path:', posterPath);

// 	if (!posterPath || !posterPath.startsWith('/')) {
// 		console.error('❌ Missing or invalid path');
// 		throw error(400, 'Invalid or missing TMDB path');
// 	}

// 	const tmdbImageUrl = `https://image.tmdb.org/t/p${posterPath}`;
// 	console.log('🌐 Fetching from:', tmdbImageUrl);

// 	try {
// 		const res = await fetch(tmdbImageUrl);

// 		if (!res.ok) {
// 			console.error('❌ TMDB returned:', res.status, res.statusText);
// 			throw error(res.status, res.statusText);
// 		}

// 		const buffer = await res.arrayBuffer();

// 		console.log('✅ Image fetched successfully!');

// 		return new Response(buffer, {
// 			headers: {
// 				'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg',
// 				'Cache-Control': 'public, max-age=86400'
// 			}
// 		});
// 	} catch (e) {
// 		console.error('🔥 Proxy fetch failed:', e);
// 		throw error(500, 'Failed to fetch image');
// 	}
// }

// <picture>
//   <!-- WebP format -->
//   <source srcset={`https://image.tmdb.org/t/p/w500${movie.poster_path}?format=webp`} type="image/webp">
//   <!-- Fallback to JPEG format -->
//   <img
//     class="w-full rounded-md shadow-lg"
//     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//     alt={movie.title || 'Movie poster'}
//   />
// </picture>
