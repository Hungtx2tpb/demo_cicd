import { LoginPage } from './../pages/page-object/login/loginPage';
import { test as baseTest } from '@playwright/test';
import { CommonComponent } from '../pages/page-object/common';
import { HomePage } from '../pages/page-object/home/homePage';
import { RegisterPage } from '../pages/page-object/register/registerPage';


type TestFixture = {
	commonComponent: CommonComponent;
	homePage: HomePage;
	loginPage: LoginPage;
};

export const loginTest = baseTest.extend<TestFixture>({
	commonComponent: async ({ page }, use) => {
		const commonComponent = new CommonComponent(page);
		await use(commonComponent);
	},
	homePage: async ({ page }, use) => {
		const home = new HomePage(page);
		await use(home);
	},
	loginPage: async ({ page }, use) => {
		const login = new LoginPage(page);
		await use(login);
	}
 
});
