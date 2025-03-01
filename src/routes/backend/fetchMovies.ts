export async function fetchMovies(query: string) {
	if (!query.trim()) return [];

	try {
		const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
		if (!response.ok) throw new Error('Failed to fetch');

		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error('Error fetching movies:', error);
		return [];
	}
}
