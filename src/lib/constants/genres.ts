export const GENRE_PAGES = {
	action: {
		id: 28,
		title: 'Action Movies',
		subtitleKey: 'action'
	},
	comedy: {
		id: 35,
		title: 'Comedy Movies',
		subtitleKey: 'comedy'
	},
	drama: {
		id: 18,
		title: 'Drama Movies',
		subtitleKey: 'drama'
	},
	thriller: {
		id: 53,
		title: 'Thriller Movies',
		subtitleKey: 'thriller'
	},
	horror: {
		id: 27,
		title: 'Horror Movies',
		subtitleKey: 'horror'
	},
	romance: {
		id: 10749,
		title: 'Romance Movies',
		subtitleKey: 'romance'
	},
	'science-fiction': {
		id: 878,
		title: 'Science Fiction Movies',
		subtitleKey: 'scifi'
	},
	fantasy: {
		id: 14,
		title: 'Fantasy Movies',
		subtitleKey: 'fantasy'
	}
} as const;

export type GenreSlug = keyof typeof GENRE_PAGES;

export const GENRE_SLUGS = Object.keys(GENRE_PAGES) as GenreSlug[];

/** Shorthand TMDB ids for server loads (e.g. homepage sections) */
export const GENRES = {
	action: GENRE_PAGES.action.id,
	comedy: GENRE_PAGES.comedy.id,
	drama: GENRE_PAGES.drama.id,
	fantasy: GENRE_PAGES.fantasy.id,
	horror: GENRE_PAGES.horror.id,
	romance: GENRE_PAGES.romance.id,
	scifi: GENRE_PAGES['science-fiction'].id,
	thriller: GENRE_PAGES.thriller.id
} as const;

export function getGenrePage(slug: string) {
	if (slug in GENRE_PAGES) {
		return { slug: slug as GenreSlug, ...GENRE_PAGES[slug as GenreSlug] };
	}

	return null;
}
