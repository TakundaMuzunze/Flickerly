import { expect, test } from '@playwright/test';
import { movieLinks, waitForMovieDetail } from './helpers';

test.describe('Search', () => {
	test('finds a movie by title and opens it from results', async ({ page }) => {
		await page.goto('/');

		await page.getByRole('button', { name: 'Expand search bar' }).click();
		const searchInput = page.getByPlaceholder('Search for movies');
		await searchInput.fill('Inception');

		await expect(page).toHaveURL(/\/movies\/search\?q=Inception/, { timeout: 10_000 });
		await expect(page.getByRole('heading', { name: /Results for "Inception"/i })).toBeVisible({
			timeout: 20_000
		});

		const firstResult = movieLinks(page).first();
		await expect(firstResult).toBeVisible();
		await firstResult.click();

		await expect(page).toHaveURL(/\/movies\/\d+/);
		await waitForMovieDetail(page);
		await expect(page.locator('main h2').first()).toContainText(/inception/i);
	});
});
