import { fetchActionMovies } from '$lib/server/actionMovies/+server';

export async function load() {
    try {
        const actionMovies = await fetchActionMovies();
        return {
            actionMovies
        };
    } catch (error) {
        console.error('Error loading action movies:', error);
        return {
            actionMovies: []
        };
    }
} 