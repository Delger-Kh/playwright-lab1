import { test, expect } from '@playwright/test';

// Test 1: Successful login, then logout.
// Verifies that a valid user can log in, reach the products page,
// and successfully log out afterward.
test('successful login and logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Fill in valid credentials and submit the login form
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Confirm login succeeded — URL changes and Products page is shown
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');

  // Log out via the hamburger menu
  await page.locator('#react-burger-menu-btn').click();
  await page.getByText('Logout').click();

  // Confirm logout succeeded — back to the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// Test 2: Unsuccessful login with wrong credentials.
// Verifies that an invalid username/password combination
// shows the expected error message and does not log the user in.
test('login fails with wrong credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('wrong_user');
  await page.getByPlaceholder('Password').fill('wrong_pass');
  await page.getByRole('button', { name: 'Login' }).click();

  // Confirm the error message appears
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});

// Test 3: Unsuccessful login with a locked-out account.
// Verifies that Sauce Demo's built-in locked-out user
// is correctly blocked from logging in.
test('locked out user cannot log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out');
});

// Test 4: An action performed after a successful login.
// Logs in successfully, then adds a product to the cart,
// and verifies the cart badge updates to reflect the item count.
test('add item to cart after successful login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Log in with valid credentials
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Confirm we're on the products page before acting
  await expect(page).toHaveURL(/inventory.html/);

  // Action after login: add the "Sauce Labs Backpack" to the cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Assert the cart badge now shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Clean up: log out at the end, since this test also logs in successfully
  await page.locator('#react-burger-menu-btn').click();
  await page.getByText('Logout').waitFor({ state: 'visible' });
  await page.getByText('Logout').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});