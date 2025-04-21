const loadedImages = new Map<string, boolean>();

export function markImageAsLoaded(url: string) {
	loadedImages.set(url, true);
}

export function hasImageLoaded(url: string) {
	return loadedImages.has(url);
}
