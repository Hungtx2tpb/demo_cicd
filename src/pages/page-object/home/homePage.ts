import { Page, expect } from '@playwright/test';
import { BasePage } from "../basePage";
import { HomePageLocator } from '../../pageLocator/homePage/homePageLocator';
import { promises } from 'dns';

export class HomePage extends BasePage {
    url: string;

    constructor(page: Page) {
        super(page);
        this.url = process.env.URL!;
    }

    public async goToHomePage() {
        await this.gotoURL(this.url);
    }

    public async verifyGoToHomePageSuccessfully(url: string, market: string) {
        const currentUrl = await this.getUrl();
        const expectedUrl = `${url}${market.toUpperCase()}`;
        expect(currentUrl).toContain(expectedUrl);
    }

    public async clickOnMenu(menu: string) {
        let menus = HomePageLocator.menuDynamics(menu);
        await this.click(menus);
    }




}