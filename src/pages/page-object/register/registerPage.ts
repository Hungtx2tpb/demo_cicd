import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class RegisterPage extends BasePage {
    url: string;
    constructor(page: Page) {
        super(page);
    }

    public async register() {
        
    }
}