import { test, expect } from '@playwright/test';

test('successful login and logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');

  await page.locator('#react-burger-menu-btn').click();
  await page.getByText('Logout').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('login fails with wrong credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('wrong_user');
  await page.getByPlaceholder('Password').fill('wrong_pass');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});