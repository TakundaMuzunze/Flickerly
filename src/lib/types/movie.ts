import type Trailer from '$lib/components/features/TrailerComponent/Trailer.svelte';

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	trailer?: Trailer;
	runtime?: number;
	genres?: Array<{ id: number; name: string }>;
	genre_ids?: number[];
	providers?: {
		GB?: {
			link?: string;
			flatrate?: Array<{ provider_name: string }>;
			rent?: Array<{ provider_name: string }>;
		};
	};
}
