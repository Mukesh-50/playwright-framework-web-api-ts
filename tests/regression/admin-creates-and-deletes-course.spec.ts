import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';
import user from '../../testdata/user.json';

// Returns a date n days from today (negative n = past).
const daysFromToday = (n: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

// yyyy-mm-dd in local time, the format a date input expects. ('en-CA' locale formats this way.)
const toInputValue = (d: Date): string => d.toLocaleDateString('en-CA');

// dd/mm/yyyy, the format the course table shows for the en-IN locale.
const toDisplay = (d: Date): string =>
  d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

const courseRowFor = (page: Page, name: string) =>
  page.getByRole('row').filter({
    has: page.getByRole('cell', { name, exact: true }),
  });

test.describe('Course management', () => {
  test.use({
    locale: 'en-IN',
    storageState: { cookies: [], origins: [] },
  });

  // Unique per browser project and per run, so parallel runs and leftovers never collide.
  let courseName: string;

  test.beforeEach(async ({}, testInfo) => {
    courseName = `dummy course ${testInfo.project.name}-${Date.now()}`;
  });

  // If the test failed midway, the course may still exist: delete it so it doesn't pile up.
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) return;

    await page.goto('/course/manage');
    const leftover = courseRowFor(page, courseName);
    if ((await leftover.count()) === 0) return;

    await leftover.getByRole('checkbox').check();
    await page.getByRole('button', { name: /Delete Courses/ }).click();
    await expect(leftover).toHaveCount(0);
  });

  test('admin can create and delete a course', async ({ page }) => {
    const thumbnailPath = path.resolve('testdata/course-thumbnail.png');
    // Start date must not be in the past, or the app replaces it with today's date.
    const startDate = daysFromToday(1);
    const endDate = daysFromToday(30);

    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Enter Email' }).fill(user.username);
    await page.getByRole('textbox', { name: 'Enter Password' }).fill(user.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).not.toHaveURL(/login/);

    await page.getByText('Manage', { exact: true }).hover();
    await page.getByRole('link', { name: 'Manage Courses' }).click();
    await expect(page).toHaveURL(/\/course\/manage$/);

    await page.getByRole('button', { name: /Add New Course/ }).click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('input[type="file"]').setInputFiles(thumbnailPath);
    await dialog.getByRole('textbox').nth(0).fill(courseName);
    await dialog.getByRole('textbox').nth(1).fill('dummy Description');
    await dialog.getByRole('textbox').nth(2).fill('Mukesh Otwani');
    await dialog.getByRole('textbox').nth(3).fill('500');
    await dialog.getByRole('textbox').nth(4).fill(toInputValue(startDate));
    await dialog.getByRole('textbox').nth(5).fill(toInputValue(endDate));
    await dialog.getByRole('button', { name: /Select Category/ }).click();
    await dialog.getByRole('button', { name: 'JavaScript' }).click();
    await dialog.getByRole('button', { name: 'Save' }).click();

    const courseRow = courseRowFor(page, courseName);
    await expect(courseRow).toHaveCount(1);
    await expect(courseRow).toContainText('₹500');
    await expect(courseRow).toContainText('Mukesh Otwani');
    await expect(courseRow).toContainText(toDisplay(startDate));
    await expect(courseRow).toContainText(toDisplay(endDate));
    await expect(courseRow).toContainText('JavaScript');

    await courseRow.getByRole('checkbox').check();
    await page.getByRole('button', { name: /Delete Courses/ }).click();
    await expect(courseRow).toHaveCount(0);

    await page.getByRole('img', { name: 'menu' }).click();
    const signOutButton = page.getByRole('button', { name: 'Sign out' });
    await expect(signOutButton).toBeVisible();
    await signOutButton.click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
