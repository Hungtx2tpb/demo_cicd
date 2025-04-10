import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { EnvironmentUtils } from '../../../utils/environment-util';
import { HomePageLocator } from '../../pageLocator/homePage/homePageLocator';
import { format } from 'path';
import { EXPECT_TIMEOUT } from '../../../constants/timeout_constant';


export class LoginPage extends BasePage {
    url:string;
	constructor(page: Page) {
		super(page);
        this.url = process.env.URL!
        console.log("url ",this.url);
	}

    public async login() {
        const credentialData = EnvironmentUtils.getAuthenticationInfo("Root Admin")
        console.log(JSON.stringify(credentialData));
        await this.gotoURL(this.url);
    }

    public async loginToHomePage(username: string, password: string): Promise<void> {
        await this.click(HomePageLocator.POPUP_DIALOG);
        await this.click(HomePageLocator.ICON_USER);
        await this.fill(HomePageLocator.EMAIL, username);
        await this.fill(HomePageLocator.PASSWORD, password);
        await this.click(HomePageLocator.SIGNIN);
    }

}
