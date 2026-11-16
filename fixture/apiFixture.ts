import { test as base } from '@playwright/test';

import { UserService } from '../services/UserService';

import { BookingService } from '../services/BookingService';

// Tells TypeScript which fixtures this file adds and what type each one is.
type ApiFixtures = {
       userService: UserService;
       bookingService: BookingService;
};

/**
 * API fixtures: every API test gets ready-made service objects,
 * the same way UI tests get loginPage, dashboardPage, etc.
 *
 * Usage in a test:
 *   test('my test', async ({ bookingService }) => { ... })
 */
export const test = base.extend<ApiFixtures>({

       userService: async ({ request }, use) =>
       {
            await use(new UserService(request));
       }
       ,
       bookingService: async ({ request }, use) =>
       {
            await use(new BookingService(request));
       }

});

export { expect } from '@playwright/test';
