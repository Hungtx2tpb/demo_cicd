import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { ToastMsgComponent } from "./components/toast_message";

export class CommonComponent extends BasePage {
	public toastMsg: ToastMsgComponent;

	constructor(page: Page) {
		super(page);
		this.toastMsg = new ToastMsgComponent(page);
	}
}
