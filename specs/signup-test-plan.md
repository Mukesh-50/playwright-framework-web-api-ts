# Signup Page – Test Plan (Positive Scenarios)

**URL:** https://freelance-learn-automation.vercel.app/signup
**Scope:** Happy-path only, valid test data. Explored live with Playwright MCP; the main flow was executed end to end.

## Page Elements (observed)
- Nav: Home (`/`), Practise (`/practise`), "Log in" button
- Heading "Sign Up"
- Textboxes: Name, Email, Password (accessible name "Password must be atleast 6 characters")
- Interests checkboxes: RAG, rest assured, appium, PlaywrightTests, JavaScript, SQL
- Gender radios: Male (default checked), Female
- State combobox (36 options, Andhra Pradesh … Puducherry)
- Hobbies multi-select listbox: Playing, Reading, Swimming, Singing, Dancing
- "Sign up" button – disabled initially
- Link "Already a user? Login" → `/login`

## Test Data
From `testdata/signupUser.json`: name `QA Planner`, password `Test@1234`, interests `PlaywrightTests`/`JavaScript`, gender `Female`, state `Karnataka`, hobbies `Reading`/`Singing`.
Email is generated per run (e.g. `qa.planner+<timestamp>@example.com`). Non-production data only.

**Seed:** `tests/seed.spec.ts`. Starting state for every scenario: fresh context, navigate to `/signup`.

---

## 1. Page Load

### 1.1 Page renders all signup controls
1. Navigate to `/signup`.
- **Expected:** URL contains `signup`; heading, three textboxes, six interest checkboxes, Male/Female radios (Male checked), State dropdown, Hobbies listbox, "Sign up" button and "Already a user? Login" link are visible.


## 2. Successful Registration

### 2.1 Register with all fields filled
1. Fill Name, a unique Email, Password.
2. Check `PlaywrightTests` and `JavaScript`.
3. Select gender `Female`.
4. Select state `Karnataka`.
5. Select hobbies `Reading` and `Singing`.
6. Wait for "Sign up" to be enabled, then click it.
- **Expected (verified live):** the app redirects to `/login`. The page object also expects the message "Signup successfully, Please login!"; this was not observed after the redirect, so confirm whether it is a transient toast.



## 3. Post-registration

### 3.1 Newly registered user can log in
1. Complete 2.1, keep credentials.
2. On `/login`, enter the same email and password, submit.
- **Expected:** login succeeds and the courses/dashboard page is shown.

---

## Implementation Notes
- Reuse `pages/SignupPage.ts` (`open`, `fillSignupForm`, `submit`) and `testdata/signupUser.json`.
- Put specs in `tests/regression/Register.spec.ts`.
- Use web-first assertions; no fixed sleeps. Wait for "Sign up" to be enabled before clicking.
