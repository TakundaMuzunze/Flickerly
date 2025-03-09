export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	providers?: {
		GB?: {
			link?: string;
			flatrate?: Array<{ provider_name: string }>;
			rent?: Array<{ provider_name: string }>;
		};
	};
}
