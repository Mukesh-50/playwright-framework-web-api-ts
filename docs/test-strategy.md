# Test strategy

## Scope and target

This repository contains browser-based end-to-end tests for the application configured as `baseURL` in `playwright.config.ts` (`https://freelance-learn-automation.vercel.app`). These tests exercise the application over the network; they are not isolated unit tests.

## Test groups

- **Smoke (`tests/smoke/`)**: quick checks of core flows, currently login/logout and login responses for invalid or missing credentials.
- **Regression (`tests/regression/`)**: checks of additional application behavior, currently that the signup page loads.
- **API (`tests/api/`)**: API tests built with the service object model (see below). They run in the `api` project only, without a browser.
- **Authentication setup (`tests/auth.setup.ts`)**: signs in and saves storage state for browser projects that depend on the setup project.

Use smoke tests for a small set of high-value checks and regression tests for broader coverage. Keep tests independent where practical, and avoid relying on a previous test's browser state.

## API tests and the service object model

API tests follow the same idea as page objects:

- `services/BaseService.ts` has the common `get`, `post`, `put` and `delete` methods.
- One service class per API (`services/UserService.ts`, `services/BookingService.ts`) holds the base URL and one method per endpoint. Each method returns the Playwright response.
- `fixture/apiFixture.ts` gives tests ready-made services (`userService`, `bookingService`).
- Request bodies live in `testdata/api/`.

To add a new endpoint, add a method to the matching service; to add a new API, create a new service that extends `BaseService` and register it in `fixture/apiFixture.ts`. Run API tests with `npm run test:api`.

## Browser coverage and artifacts

The Playwright config defines Chromium, Firefox, and WebKit projects. Each depends on the setup project and uses its saved authentication state; specs that intentionally test the login screen opt out of that state.

On test runs, Playwright retains traces, screenshots, and videos on failure according to the configuration. The configured HTML reporter produces a Playwright report, and the Allure reporter writes raw results to `allure-results/`.

## Test data and credentials

Put reusable, non-sensitive inputs in `testdata/`. The current login setup reads its account from `testdata/user.json`. That file is tracked, so its contents must be limited to a dedicated non-production test account. Never put production credentials, tokens, or personal data in test files or reports. If credentials need to vary by environment, update the test setup to consume environment variables or a secret store rather than committing them.

## Running tests

```sh
npx playwright test
npx playwright test tests/smoke
npx playwright test --project=chromium
```

Because the tests depend on a remote application, distinguish product regressions from outages or changes in that external environment when investigating failures.

