import { expect, type Page } from '@playwright/test';

/** First movie link that is not the brand/nav — prefers poster cards in grids/carousels. */
export function movieLinks(page: Page) {
	return page.locator('main a[href^="/movies/"]');
}

export async function openFirstMovie(page: Page) {
	const link = movieLinks(page).first();
	await expect(link).toBeVisible({ timeout: 20_000 });
	const href = await link.getAttribute('href');
	await link.click();
	await expect(page).toHaveURL(/\/movies\/\d+/);
	return href;
}

export async function waitForMovieDetail(page: Page) {
	await expect(page.getByRole('heading', { name: 'Cast' })).toBeVisible({ timeout: 20_000 });
	await expect(page.getByRole('button', { name: /watchlist/i })).toBeVisible();
}

export async function clearWatchlist(page: Page) {
	await page.addInitScript(() => {
		localStorage.removeItem('watchlist');
	});
}
