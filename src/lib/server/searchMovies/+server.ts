import { TMDB_KEY } from '$env/static/private';
import { processMovieData } from '$lib/utils/setMovies';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string) {
    try {
        const response = await fetch(
            `${TMDB_API_URL}/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        return processMovieData(data.results);
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
} 