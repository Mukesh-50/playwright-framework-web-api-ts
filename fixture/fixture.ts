import { test as base } from '@playwright/test';

import {LoginPage} from '../pages/LoginPage';

import {DashboardPage} from '../pages/DashboardPage';

import {SignupPage} from '../pages/SignupPage';

// Tells TypeScript which fixtures this file adds and what type each one is.
type PageFixtures = {
       loginPage: LoginPage;
       dashboardPage: DashboardPage;
       signupPage: SignupPage;
};


export const test=base.extend<PageFixtures>({


       loginPage:async ({page},use)=>
       {

            console.log('Inside loginPage fixture');

            const loginPage = new LoginPage(page);

            await use(loginPage);

            console.log('Exiting loginPage fixture');

       }
       ,
       dashboardPage:async ({page},use)=>
       {

            console.log('Inside Dashboard fixture');

            const dashboardPage = new DashboardPage(page);

            await use(dashboardPage);

            console.log('Exiting Dashboard fixture');

       }
       ,
       signupPage:async ({page},use)=>
       {
            await use(new SignupPage(page));
       }


});

export { expect } from '@playwright/test';
