import type { Genre } from '$lib/types/genres';

export const genreStore = $state<{ genres: Map<number, string> }>({ genres: new Map() });

export function setGenres(genreList: Genre[]) {
	genreStore.genres = new Map(genreList.map((g) => [g.id, g.name]));
}

export function getGenreName(id: number): string {
	return genreStore.genres.get(id) || 'Unknown';
}
