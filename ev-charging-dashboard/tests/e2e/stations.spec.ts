import { test, expect } from '@playwright/test';

test.describe('Station Status', () => {
  test('displays station list', async ({ page }) => {
    await page.goto('/stations');
    await expect(page.getByRole('heading', { name: 'Charging Station Status' })).toBeVisible();
    await expect(page.getByText('Search stations')).toBeVisible();
  });

  test('filters stations by search', async ({ page }) => {
    await page.goto('/stations');
    const searchInput = page.getByLabel('Search stations');
    await searchInput.fill('Station 1');
    await expect(page.getByText('Charging Station 1')).toBeVisible();
  });
});
