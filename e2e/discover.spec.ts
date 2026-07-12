import { expect, test } from '@playwright/test';
import { openFirstMovie, waitForMovieDetail } from './helpers';

test.describe('Discover movies', () => {
	test('from home, opens a movie and shows core detail content', async ({ page }) => {
		await page.goto('/');

		await openFirstMovie(page);
		await waitForMovieDetail(page);

		const title = page.locator('main h2').first();
		await expect(title).toBeVisible();
		await expect(title).not.toHaveText('');

		await expect(page.getByRole('button', { name: 'Trailer' }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Similar Movies' })).toBeVisible();

		await page.getByRole('button', { name: 'Open movie information modal' }).first().click();
		await expect(page.getByText('Overview', { exact: true })).toBeVisible();
		await expect(page.getByText(/^Director:/)).toBeVisible();
		await page.getByRole('button', { name: 'Close modal', exact: true }).click();
		await expect(page.getByText('Overview', { exact: true })).toHaveCount(0);
	});

	test('from a genre listing, opens a movie detail page', async ({ page }) => {
		await page.goto('/genre/comedy');

		await expect(page.getByRole('heading', { name: 'Comedy Movies' })).toBeVisible();
		await openFirstMovie(page);
		await waitForMovieDetail(page);
	});
});
