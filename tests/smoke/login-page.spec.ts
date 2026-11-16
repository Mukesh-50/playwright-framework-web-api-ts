import { test, expect } from '../../fixture/fixture';

test.describe('Login page', { tag: ['@smoke', '@login'] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('displays the login controls', async ({ loginPage }) => {
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('navigates to the signup page for a new user', async ({ loginPage, page }) => {
    await loginPage.clickOnNewUserSignUpLink();

    await expect(page).toHaveURL(/signup/);
  });
});
