import type { Page, Locator } from '@playwright/test';
import {BasePage} from "./BasePage"


export class LoginPage extends BasePage {

        readonly usernameField: Locator;

        readonly passwordField: Locator;

        readonly loginButton: Locator;

        readonly newUrlSignUpLink: Locator;

        readonly errorMessage: Locator;

        constructor(page: Page)
        {

            super(page)

            this.page = page;

            this.usernameField = page.getByPlaceholder("Enter Email")

            this.passwordField = page.getByPlaceholder("Enter Password")

            this.loginButton = page.getByText("Sign in",{exact: true})

            this.newUrlSignUpLink=page.getByText("New user? Signup",{exact: true})

            this.errorMessage = page.locator(".errorMessage")

        }

        async loginToApplication(username: string, password: string)
        {

            await this.type(this.usernameField,username)

            //await this.usernameField.fill(username);

            await this.type(this.passwordField, password)

            //await this.passwordField.fill(password);

            await this.click(this.loginButton)
            //await this.loginButton.click();
        }

        async clickOnNewUserSignUpLink()
        {
            await this.click(this.newUrlSignUpLink)

            //await this.newUrlSignUpLink.click();
        }

        async getErrorMessage()
        {
            return await this.getText(this.errorMessage)
            //return await this.errorMessage.textContent();
        }

}
