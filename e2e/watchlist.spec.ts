import { expect, test } from '@playwright/test';
import { clearWatchlist, movieLinks, openFirstMovie, waitForMovieDetail } from './helpers';

test.describe('Watchlist', () => {
	test.beforeEach(async ({ page }) => {
		await clearWatchlist(page);
	});

	test('adds a movie from details, shows it on My List, then removes it', async ({ page }) => {
		await page.goto('/');
		await openFirstMovie(page);
		await waitForMovieDetail(page);

		const title = (await page.locator('main h2').first().innerText()).trim();
		expect(title.length).toBeGreaterThan(0);

		await page.getByRole('button', { name: 'Add to watchlist' }).click();
		await expect(page.getByRole('button', { name: 'Remove from watchlist' })).toBeVisible();
		await expect(page.getByText(`${title} added to your watchlist`)).toBeVisible();

		await page.getByRole('button', { name: 'Open navigation menu' }).click();
		await page.getByRole('link', { name: 'My List' }).click();
		await expect(page).toHaveURL('/watchlist');

		await expect(page.getByRole('heading', { name: 'Your Watchlist', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Your watchlist is empty' })).toHaveCount(0);
		await expect(movieLinks(page).first()).toBeVisible();
		await expect(page.getByText(title).first()).toBeVisible();

		await movieLinks(page).first().click();
		await waitForMovieDetail(page);
		await expect(page.getByRole('button', { name: 'Remove from watchlist' })).toBeVisible();

		await page.getByRole('button', { name: 'Remove from watchlist' }).click();
		await expect(page.getByRole('button', { name: 'Add to watchlist' })).toBeVisible();
		await expect(page.getByText(`${title} removed from your watchlist`)).toBeVisible();

		await page.goto('/watchlist');
		await expect(page.getByRole('heading', { name: 'Your watchlist is empty' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Start exploring' })).toHaveAttribute('href', '/');
	});
});
