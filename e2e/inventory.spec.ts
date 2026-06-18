import { expect, test } from '@playwright/test';

test('orders and products user flow', async ({ page }) => {
  await page.goto('/orders');
  await expect(page.getByRole('heading', { name: /Приходы/ })).toBeVisible();
  await expect(page.getByTestId('orders-view')).toHaveAttribute('data-hydrated', 'true');
  await page.locator('.order-card').first().click();
  await expect(page.locator('.details-panel__add')).toBeVisible();
  await page.getByRole('button', { name: 'close order details' }).click();

  await page.getByRole('link', { name: 'Продукты' }).click();
  await expect(page.getByRole('heading', { name: /Продукты/ })).toBeVisible();
  await expect(page.getByTestId('products-view')).toHaveAttribute('data-hydrated', 'true');
  await page.getByLabel('Тип:').selectOption('Laptops');
  await expect(page.locator('.product-row__type', { hasText: 'Laptops' }).first()).toBeVisible();
});
