import { loginTest } from "../../src/setup/page-setup";

loginTest.describe("TC_1 test login @smoke", () => {
    loginTest('test login with valid credentials @smoke', async ({ homePage, loginPage }) => {
      // let url = process.env.URL || '';
      // let market = process.env.market || '';
      await homePage.goToHomePage();
      // await homePage.verifyGoToHomePageSuccessfully(url, market);
      // await loginPage.loginToHomePage('fatibe7647@operades.com', '927445');
    });
  })