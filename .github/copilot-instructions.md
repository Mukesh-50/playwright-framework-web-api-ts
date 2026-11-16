# Project instructions

- This repository is a TypeScript Playwright Test framework. Follow the existing `.ts` import/export and formatting patterns in nearby files.
- Keep browser tests under `tests/`, reusable page objects under `pages/`, shared fixtures in `fixture/fixture.ts`, and reusable non-secret inputs in `testdata/`.
- Reuse existing page objects and fixtures where appropriate. Prefer Playwright locators and web-first assertions; avoid fixed sleeps.
- Run the narrowest relevant check, typically `npx playwright test path/to/spec.spec.ts`. Run `npx playwright test` when changes affect shared behavior. Tests use a remote application configured in `playwright.config.ts`.
- Do not add credentials, tokens, or production data to tracked files, test output, or generated artifacts. The current login data must remain limited to a dedicated non-production test account.
- Do not commit generated reports, browser state, or test-result artifacts; see `.gitignore`.
- Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution conventions and [docs/test-strategy.md](../docs/test-strategy.md) for test organization.
