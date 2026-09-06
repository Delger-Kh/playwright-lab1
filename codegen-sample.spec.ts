import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-credentials"]').dblclick();
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('[data-test="username"]').click({
    modifiers: ['ControlOrMeta']
  });
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-password"]').dblclick();
  await page.locator('[data-test="login-password"]').click();
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="login-password"]').click();
  await page.locator('[data-test="login-password"]').dblclick();
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('[data-test="password"]').dblclick();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});