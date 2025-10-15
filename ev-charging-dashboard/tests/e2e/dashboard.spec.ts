import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('loads and displays dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Network Dashboard' })).toBeVisible();
  });

  test('navigates to station status page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Station Status' }).click();
    await expect(page.getByRole('heading', { name: 'Charging Station Status' })).toBeVisible();
  });

  test('navigates to statistics page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Statistics' }).click();
    await expect(page.getByRole('heading', { name: 'Network Statistics' })).toBeVisible();
  });
});
