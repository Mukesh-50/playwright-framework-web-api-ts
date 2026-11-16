import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';
import signupUser from '../../testdata/signupUser.json';

test.describe('Post-registration', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Newly registered user can log in', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const email = `qa.planner+${randomUUID()}@example.com`;

    // 1. Complete registration and keep the email and password for login.
    await signupPage.open();
    await signupPage.fillSignupForm({
      name: signupUser.name,
      email,
      password: signupUser.password,
    });
    await signupPage.selectInterests(signupUser.interests);
    await signupPage.selectGender(signupUser.gender);
    await page.getByRole('combobox').selectOption(signupUser.state);
    await page.getByRole('listbox').selectOption(signupUser.hobbies);
    await signupPage.submit();
    await expect(page).toHaveURL(/\/login$/);
    await expect(signupPage.successMessage).toBeVisible();

    // 2. Log in with the newly registered email and password.
    await loginPage.loginToApplication(email, signupUser.password);

    // Verify that the courses dashboard is displayed.
    await expect(page).toHaveURL(/\/$/);
   
    
  });
});
