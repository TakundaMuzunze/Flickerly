import { genreStore } from '$lib/stores/genres.stores.svelte';
import type { Genre } from '$lib/types/genres';

export function setGenres(genreList: Genre[]) {
	genreStore.genres = new Map(genreList.map((g) => [g.id, g.name]));
}

export function getGenreName(id: number): string {
	return genreStore.genres.get(id) || '';
}
