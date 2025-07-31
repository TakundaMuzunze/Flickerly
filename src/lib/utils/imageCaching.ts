const loadedImages = new Map<string, boolean>();

export function markImageAsLoaded(url: string) {
	loadedImages.set(url, true);
}

export function hasImageLoaded(url: string) {
	return loadedImages.has(url);
}

export function clearImageCache() {
	loadedImages.clear();
}

// Clear cache when navigating between movies
if (typeof window !== 'undefined') {
	window.addEventListener('popstate', clearImageCache);
}
