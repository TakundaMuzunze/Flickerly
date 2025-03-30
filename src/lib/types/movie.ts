import type Trailer from '$lib/components/TrailerComponent/Trailer.svelte';

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	trailer?: Trailer;
	providers?: {
		GB?: {
			link?: string;
			flatrate?: Array<{ provider_name: string }>;
			rent?: Array<{ provider_name: string }>;
		};
	};
}
