import { expect, test } from '@playwright/test';

test('loads a synthetic review queue and preserves the no-send boundary', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Load synthetic sample' }).first().click();
  await expect(page.getByText('3 accepted, 2 rejected, 1 duplicates.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Avery Chen' })).toBeVisible();
  await expect(page.getByText('Provided evidence')).toBeVisible();
  await page.screenshot({ path: '/tmp/prospect-review-mvp.png', fullPage: true });
  await page.getByRole('button', { name: 'Approve for preparation' }).click();
  await expect(page.getByLabel('Traceability')).toContainText('approved_for_send_prep');
  await expect(page.getByRole('button', { name: /send/i })).toHaveCount(0);
});

test('stacks the control center for a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Load synthetic sample' }).first().click();
  await expect(page.getByLabel('Prospect queue')).toBeVisible();
  await expect(page.getByLabel('Review Avery Chen')).toBeVisible();
});
