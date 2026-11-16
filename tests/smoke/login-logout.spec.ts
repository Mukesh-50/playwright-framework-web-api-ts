import { test, expect } from '../../fixture/fixture';

import user from '../../testdata/user.json';

test.describe('Login and logout', { tag: ['@smoke', '@login'] }, () => {
  // The flow starts logged out instead of using the shared storageState from the "setup" project.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('signs in, signs out and shows the Sign in button', async ({ page, loginPage, dashboardPage }) => {
    await page.goto('/login');

    await loginPage.loginToApplication(user.username, user.password);
    await expect(page).not.toHaveURL(/login/);

    await dashboardPage.clickOnMenuIcon();

    await dashboardPage.clickOnSignOutButton();
    
    await expect(loginPage.loginButton).toBeVisible();
  });
});
