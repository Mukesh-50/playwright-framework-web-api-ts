import { expect } from '@playwright/test'
import type { Page, Locator } from '@playwright/test'
import { BasePage } from "./BasePage"

// The data fillSignupForm() accepts. A "?" means the field is optional.
export type SignupFormData = {
        name: string
        email: string
        password: string
        interests?: string[]
        gender?: string
        state?: string
        hobbies?: string[]
}

export class SignupPage extends BasePage {

        readonly nameField: Locator
        readonly emailField: Locator
        readonly passwordField: Locator
        readonly stateDropdown: Locator
        readonly hobbiesList: Locator
        readonly signupButton: Locator
        readonly loginLink: Locator
        readonly successMessage: Locator

        constructor(page: Page)
        {
            super(page)

            this.nameField = page.getByRole('textbox', { name: 'Name' })

            this.emailField = page.getByRole('textbox', { name: 'Email' })

            this.passwordField = page.getByRole('textbox', { name: /Password/ })

            this.stateDropdown = page.getByRole('combobox')

            this.hobbiesList = page.getByRole('listbox')

            this.signupButton = page.getByRole('button', { name: 'Sign up' })

            this.loginLink = page.getByRole('link', { name: 'Already a user? Login' })

            this.successMessage = page.getByText('Signup successfully, Please login!')
        }

        async open()
        {
            await this.navigateToApplication('/signup')
        }

        async selectInterests(interests: string[])
        {
            for (const interest of interests)
            {
                await this.page.getByRole('checkbox', { name: interest, exact: true }).check()
            }
        }

        async selectGender(gender: string)
        {
            await this.page.locator(`input[name="gender"][value="${gender}"]`).check()
        }

        async fillSignupForm({ name, email, password, interests = [], gender, state, hobbies = [] }: SignupFormData)
        {
            await this.type(this.nameField, name)
            await this.type(this.emailField, email)
            await this.type(this.passwordField, password)

            await this.selectInterests(interests)

            if (gender) await this.selectGender(gender)
            if (state) await this.handleDropdown(this.stateDropdown, state)
            if (hobbies.length) await this.hobbiesList.selectOption(hobbies)
        }

        async submit()
        {
            // The button enables asynchronously after the form becomes valid.
            await expect(this.signupButton).toBeEnabled()
            await this.click(this.signupButton)
        }
}
