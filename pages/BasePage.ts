import type { Page, Locator } from '@playwright/test';


export class BasePage
{
        page: Page;

        constructor(page: Page)
        {
            this.page = page;
        }

        // waits , alert, fill, type, dropdown, handle multiple tabs , capture text and more methods can be added here.

        async handleDropdown(selector: Locator, value: string)
        {
            await selector.selectOption(value);

            console.log(`**** dropdown handled with value ${value} ****`);
        }

       async getText(selector: Locator): Promise<string | null>
       {
            return await selector.textContent();
       }

       async type(selector: Locator, text: string)
       {
            await selector.fill(text);
            console.log(`**** type performed with value ${text} ****`);
       }

       async click(selector: Locator)
       {
            await selector.click();
            console.log(`**** click performed ****`);
       }

       async navigateToApplication(url: string)
       {
            await this.page.goto(url);
            console.log(`**** navigated to URL: ${url} ****`);
       }

       async uploadFiles(selector: Locator, filePaths: string | string[])
       {
            await selector.setInputFiles(filePaths);
            console.log(`**** files uploaded: ${filePaths} ****`);
       }

}
