import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { SignupPage } from '../../pages/SignupPage';
import signupUser from '../../testdata/signupUser.json';

test.describe('Successful Registration', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Register with all fields filled', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Start from the signup page.
    await signupPage.open();

    // 1. Fill Name, a unique Email, Password.
    const email = `qa.planner+${randomUUID()}@example.com`;
    await signupPage.fillSignupForm({
      name: signupUser.name,
      email,
      password: signupUser.password,
    });

    // 2. Check PlaywrightTests and JavaScript.
    await signupPage.selectInterests(signupUser.interests);

    // 3. Select gender Female.
    await signupPage.selectGender(signupUser.gender);

    await expect(page.getByRole('radio').nth(1)).toBeChecked();

    // 4. Select state Karnataka.
    await page.getByRole('combobox').selectOption(signupUser.state);

    // 5. Select hobbies Reading and Singing.
    await page.getByRole('listbox').selectOption(signupUser.hobbies);

    // 6. Wait for Sign up to be enabled, then click it.
    await signupPage.submit();

    // Verify the successful registration redirect and confirmation message.
    await expect(page).toHaveURL(/\/login$/);
    
    await expect(signupPage.successMessage).toBeVisible();
  });
});
