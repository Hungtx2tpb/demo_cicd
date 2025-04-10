// import { test } from '@playwright/test';
// import { LoginPage } from '../../src/pages/page-object/login/loginPage';
// import { HomePage } from '../../src/pages/page-object/home/homePage';

// test.describe('login without fixture', async () => {
//     let homePage: HomePage;
//     let loginPage: LoginPage;
//     test.beforeEach(async ({ page }) => {
//         homePage = new HomePage(page);
//         loginPage = new LoginPage(page);
//     });

//     test('TC_1 login without fixture', async () => {
//         let url = process.env.URL || '';
//         let market = process.env.market || '';
//         await homePage.goToHomePage();
//         await homePage.verifyGoToHomePageSuccessfully(url, market);
//         await loginPage.loginToHomePage('fatibe7647@operades.com', '927445');
//         await homePage.clickOnMenu('Home');
//     })
// })