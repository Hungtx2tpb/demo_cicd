import { Dialog, FrameLocator, Locator, Page, expect, selectors, Response } from '@playwright/test';
import { SMALL_TIMEOUT, STANDARD_TIMEOUT } from '../../constants/timeout_constant';
import {
	CheckOptions,
	ClearOptions,
	ClickOptions,
	DoubleClickOptions,
	DragOptions,
	FillOptions,
	GetByPlaceholderOptions,
	GetByRoleOptions,
	GetByRoleTypes,
	GetByTextOptions,
	GotoOptions,
	HoverOptions,
	LocatorOptions,
	NavigationOptions,
	SelectOptions,
	TimeoutOption,
	TypeOptions,
	UploadOptions,
	UploadValues,
	WaitForLoadStateOptions,
} from '../../utils/optional-parameter-types';
import { LOADSTATE } from '../../../playwright.config';

export class BasePage {
	page: Page;
	readonly domain: string;
	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Returns the current Page.
	 * @returns {Page} The current Page.
	 */
	getPage(): Page {
		return this.page;
	}

	/**
	 * Sets the current Page.
	 * @param {Page} pageInstance - The Page instance to set as the current Page.
	 */
	setPage(pageInstance: Page): void {
		this.page = pageInstance;
	}

	/**
	 * Switches to a different page by its index (1-based).
	 * If the desired page isn't immediately available, this  will wait and retry for up to 'SMALL_TIMEOUT' seconds.
	 * @param {number} winNum - The index of the page to switch to.
	 * @throws {Error} If the desired page isn't found within 'SMALL_TIMEOUT' seconds.
	 */
	async switchPage(winNum: number): Promise<void> {
		const startTime = Date.now();
		while (this.page.context().pages().length < winNum && Date.now() - startTime < SMALL_TIMEOUT) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
		if (this.page.context().pages().length < winNum) {
			throw new Error(`Page number ${winNum} not found after ${SMALL_TIMEOUT} seconds`);
		}
		const pageInstance = this.page.context().pages()[winNum - 1];
		await pageInstance.waitForLoadState();
		this.setPage(pageInstance);
	}

	/**
	 * Switches back to the default page (the first one).
	 */
	async switchToDefaultPage(): Promise<void> {
		const pageInstance = this.page.context().pages()[0];
		if (pageInstance) {
			await pageInstance.bringToFront();
			this.setPage(pageInstance);
		}
	}

	/**
	 * Closes a page by its index (1-based).
	 * If no index is provided, the current page is closed.
	 * If there are other pages open, it will switch back to the default page.
	 * @param {number} winNum - The index of the page to close.
	 */
	async closePage(winNum: number): Promise<void> {
		if (!winNum) {
			await this.page.close();
			return;
		}
		const noOfWindows = this.page.context().pages().length;
		const pageInstance = this.page.context().pages()[winNum - 1];
		await pageInstance.close();
		if (noOfWindows > 1) {
			await this.switchToDefaultPage();
		}
	}

	/**
	 * 1. Locators: This section contains functions and definitions related to locators.
	 * Locators are used to find and interact with elements on the page.
	 */

	/**
	 * Returns a Locator object based on the input provided.
	 * @param {string | Locator} input - The input to create the Locator from.
	 * @param {LocatorOptions} options - Optional parameters for the Locator.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocator(input: string | Locator, options?: LocatorOptions): Promise<Locator> {
		return typeof input === 'string' ? this.getPage().locator(input, options) : input;
	}

	/**
	 * Returns a Locator object with a specific testId. The global testId attribute is set in the playwright.config.ts file with default value as 'data-testid' if not set explicitly, but can be overridden by providing an attributeName.
	 * @param {string | RegExp} testId - The testId to create the Locator from.
	 * @param {string} [attributeName] - Optional attribute name for the testId. If provided, this will override the default 'testId' attribute value set in the playwright.config.ts file only for this instance.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocatorByTestId(testId: string | RegExp, attributeName?: string): Promise<Locator> {
		if (attributeName) {
			selectors.setTestIdAttribute(attributeName);
		}
		return this.getPage().getByTestId(testId);
	}

	/**
	 * Returns a Locator object with a specific text.
	 * @param {string | RegExp} text - The text to create the Locator from.
	 * @param {GetByTextOptions} options - Optional parameters for the Locator.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocatorByText(text: string | RegExp, options?: GetByTextOptions): Promise<Locator> {
		return this.getPage().getByText(text, options);
	}

	/**
	 * Returns a Locator object with a specific role.
	 * @param {GetByRoleTypes} role - The role to create the Locator from.
	 * @param {GetByRoleOptions} options - Optional parameters for the Locator.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocatorByRole(role: GetByRoleTypes, options?: GetByRoleOptions): Promise<Locator> {
		return this.getPage().getByRole(role, options);
	}

	/**
	 * Returns a Locator object with a specific label.
	 * @param {string | RegExp} text - The label text to create the Locator from.
	 * @param {GetByRoleOptions} options - Optional parameters for the Locator.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocatorByLabel(text: string | RegExp, options?: GetByRoleOptions): Promise<Locator> {
		return this.getPage().getByLabel(text, options);
	}

	/**
	 * Returns a Locator object with a specific placeholder.
	 * @param {string | RegExp} text - The place holder text to create the Locator from.
	 * @param {GetByPlaceholderOptions} options - Optional parameters for the Locator.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocatorByPlaceholder(
		text: string | RegExp,
		options?: GetByPlaceholderOptions,
	): Promise<Locator> {
		return this.getPage().getByPlaceholder(text, options);
	}

	/**
	 * Returns all Locator objects based on the input provided.
	 * @param {string | Locator} input - The input to create the Locators from.
	 * @param {LocatorOptions} options - Optional parameters for the Locators.
	 * @returns {Promise<Locator[]>} - The created Locator objects.
	 */
	async getAllLocators(input: string | Locator, options?: LocatorOptions): Promise<Locator[]> {
		return typeof input === 'string'
			? await this.getPage().locator(input, options).all()
			: await input.all();
	}

	/**
	 * 2. Frames: This section contains functions and definitions related to frames.
	 * Frames are used to handle and interact with iframes or frames within the web page.
	 */

	/**
	 * Returns a FrameLocator object based on the input provided.
	 * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
	 * @returns {FrameLocator} - The created FrameLocator object.
	 */
	async getFrameLocator(frameInput: string | FrameLocator): Promise<FrameLocator> {
		return typeof frameInput === 'string' ? this.getPage().frameLocator(frameInput) : frameInput;
	}

	/**
	 * Returns a Locator object within a specific frame based on the input provided.
	 * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
	 * @param {string | Locator} input - The input to create the Locator from, within the frame.
	 * @returns {Locator} - The created Locator object.
	 */
	async getLocatorInFrame(
		frameInput: string | FrameLocator,
		input: string | Locator,
	): Promise<Locator> {
		return (await this.getFrameLocator(frameInput)).locator(input);
	}

	/**
	 * 1. Navigations: This section contains functions for navigating within a web page or between web pages.
	 * These functions include going to a URL, waiting for a page to load, reloading a page, and going back to a previous page.
	 */

	/**
	 * Navigates to the specified URL.
	 * @param {string} path - The URL to navigate to.
	 * @param {GotoOptions} options - The navigation options.
	 * @returns {Promise<null | Response>} - The navigation response or null if no response.
	 */
	async gotoURL(
		path: string,
		options: GotoOptions = { waitUntil: LOADSTATE },
	): Promise<null | Response> {
		return await this.getPage().goto(path, options);
	}

	/**
	 * Get current url
	 */
	async getUrl(): Promise<string> {
		return this.getPage().url();
	}

	/**
	 * Waits for a specific page load state.
	 * @param {NavigationOptions} options - The navigation options.
	 */
	async waitForPageLoadState(options?: NavigationOptions): Promise<void> {
		let waitUntil: WaitForLoadStateOptions = LOADSTATE;

		if (options?.waitUntil && options.waitUntil !== 'commit') {
			waitUntil = options.waitUntil;
		}

		await this.getPage().waitForLoadState(waitUntil);
	}

	/**
	 * Reloads the current page.
	 * @param {NavigationOptions} options - The navigation options.
	 */
	async reloadPage(options?: NavigationOptions): Promise<void> {
		await Promise.all([
			this.getPage().reload(options),
			this.getPage().waitForEvent('framenavigated'),
		]);
		await this.waitForPageLoadState(options);
	}

	/**
	 * Navigates back to the previous page.
	 * @param {NavigationOptions} options - The navigation options.
	 */
	async goBack(options?: NavigationOptions): Promise<void> {
		await Promise.all([
			this.getPage().goBack(options),
			this.getPage().waitForEvent('framenavigated'),
		]);
		await this.waitForPageLoadState(options);
	}

	/**
	 * Waits for a specified amount of time.
	 * @param {number} ms - The amount of time to wait in milliseconds.
	 */
	async wait(ms: number): Promise<void> {
		// eslint-disable-next-line playwright/no-wait-for-timeout
		await this.getPage().waitForTimeout(ms);
	}

	/**
	 * 2. Actions: This section contains functions for interacting with elements on a web page.
	 * These functions include clicking, filling input fields, typing, clearing input fields, checking and unchecking checkboxes, selecting options in dropdowns, and more.
	 */

	/**
	 * Clicks on a specified element.
	 * @param {string | Locator} input - The element to click on.
	 * @param {ClickOptions} options - The click options.
	 */
	async click(input: string | Locator, options?: ClickOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.click(options);
	}

	/**
	 * Clicks on a specified element and waits for navigation.
	 * @param {string | Locator} input - The element to click on.
	 * @param {ClickOptions} options - The click options.
	 */
	async clickAndNavigate(input: string | Locator, options?: ClickOptions): Promise<void> {
		const timeout = options?.timeout || STANDARD_TIMEOUT;
		await Promise.all([
			this.click(input, options),
			this.getPage().waitForEvent('framenavigated', { timeout: timeout }),
		]);
		await this.getPage().waitForLoadState(options?.loadState || LOADSTATE, {
			timeout: timeout,
		});
	}

	/**
	 * Fills a specified element with a value.
	 * @param {string | Locator} input - The element to fill.
	 * @param {string} value - The value to fill the element with.
	 * @param {FillOptions} options - The fill options.
	 */
	async fill(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.fill(value, options);
	}

	/**
	 * Fills a specified element with a value and press Enter.
	 * @param {string | Locator} input - The element to fill.
	 * @param {string} value - The value to fill the element with.
	 * @param {FillOptions} options - The fill options.
	 */
	async fillAndEnter(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.fill(value, options);
		await locator.press('Enter');
	}

	/**
	 * Types a value into a specified element.
	 * @param {string | Locator} input - The element to type into.
	 * @param {string} value - The value to type.
	 * @param {TypeOptions} options - The type options.
	 */
	async type(input: string | Locator, value: string, options?: TypeOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.type(value, options);
	}

	/**
	 * Clears the value of a specified element.
	 * @param {string | Locator} input - The element to clear.
	 * @param {ClearOptions} options - The clear options.
	 */
	async clear(input: string | Locator, options?: ClearOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.clear(options);
	}

	/**
	 * Checks a specified checkbox or radio button.
	 * @param {string | Locator} input - The checkbox or radio button to check.
	 * @param {CheckOptions} options - The check options.
	 */
	async check(input: string | Locator, options?: CheckOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.check(options);
	}

	/**
	 * Unchecks a specified checkbox or radio button.
	 * @param {string | Locator} input - The checkbox or radio button to uncheck.
	 * @param {CheckOptions} options - The uncheck options.
	 */
	async uncheck(input: string | Locator, options?: CheckOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.uncheck(options);
	}

	/**
	 * Selects an option in a dropdown by its value.
	 * @param {string | Locator} input - The dropdown to select an option in.
	 * @param {string} value - The value of the option to select.
	 * @param {SelectOptions} options - The select options.
	 */
	async selectByValue(
		input: string | Locator,
		value: string,
		options?: SelectOptions,
	): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.selectOption({ value: value }, options);
	}

	/**
	 * Selects options in a dropdown by their values (multi select).
	 * @param {string | Locator} input - The dropdown to select options in.
	 * @param {Array<string>} value - The values of the options to select.
	 * @param {SelectOptions} options - The select options.
	 */
	async selectByValues(
		input: string | Locator,
		value: Array<string>,
		options?: SelectOptions,
	): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.selectOption(value, options);
	}

	/**
	 * Selects an option in a dropdown by its text.
	 * @param {string | Locator} input - The dropdown to select an option in.
	 * @param {string} text - The text of the option to select.
	 * @param {SelectOptions} options - The select options.
	 */
	async selectByText(
		input: string | Locator,
		text: string,
		options?: SelectOptions,
	): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.selectOption({ label: text }, options);
	}

	/**
	 * Selects an option in a dropdown by its index.
	 * @param {string | Locator} input - The dropdown to select an option in.
	 * @param {number} index - The index of the option to select.
	 * @param {SelectOptions} options - The select options.
	 */
	async selectByIndex(
		input: string | Locator,
		index: number,
		options?: SelectOptions,
	): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.selectOption({ index: index }, options);
	}

	/**
	 * 3. Alerts: This section contains functions for handling alert dialogs.
	 * These functions include accepting and dismissing alerts, and getting the text of an alert.
	 * Note: These functions currently have some repetition and could be optimized by applying the DRY (Don't Repeat Yourself) principle.
	 */

	/**
	 * Accepts an alert dialog.
	 * @param {string | Locator} input - The element to click to trigger the alert.
	 * @param {string} promptText - The text to enter into a prompt dialog.
	 * @returns {Promise<string>} - The message of the dialog.
	 */
	async acceptAlert(input: string | Locator, promptText?: string): Promise<string> {
		const locator = await this.getLocator(input);
		let dialogMessage = '';
		this.getPage().once('dialog', (dialog) => {
			dialogMessage = dialog.message();
			dialog.accept(promptText).catch((e) => console.error('Error accepting dialog:', e));
		});
		await locator.click();
		// temporary fix to alerts - Need to be fixed
		// await getPage().waitForEvent('dialog');
		return dialogMessage;
	}

	/**
	 * Dismisses an alert dialog.
	 * @param {string | Locator} input - The element to click to trigger the alert.
	 * @returns {Promise<string>} - The message of the dialog.
	 */
	async dismissAlert(input: string | Locator): Promise<string> {
		const locator = await this.getLocator(input);
		let dialogMessage = '';
		this.getPage().once('dialog', (dialog) => {
			dialogMessage = dialog.message();
			dialog.dismiss().catch((e) => console.error('Error dismissing dialog:', e));
		});
		await locator.click({ noWaitAfter: true });
		// temporary fix for alerts - Need to be fixed
		// await getPage().waitForEvent('dialog');
		return dialogMessage;
	}

	/**
	 * Gets the text of an alert dialog.
	 * @param {string | Locator} input - The element to click to trigger the alert.
	 * @returns {Promise<string>} - The message of the dialog.
	 */
	async getAlertText(input: string | Locator): Promise<string> {
		const locator = await this.getLocator(input);
		let dialogMessage = '';
		const dialogHandler = (dialog: Dialog) => {
			dialogMessage = dialog.message();
		};
		this.getPage().once('dialog', dialogHandler);
		await locator.click();
		await this.getPage().waitForEvent('dialog');
		this.getPage().off('dialog', dialogHandler);
		return dialogMessage;
	}

	/**
	 * Hovers over a specified element.
	 * @param {string | Locator} input - The element to hover over.
	 * @param {HoverOptions} options - The hover options.
	 */
	async hover(input: string | Locator, options?: HoverOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.hover(options);
	}

	/**
	 * Focuses on a specified element.
	 * @param {string | Locator} input - The element to focus on.
	 * @param {TimeoutOption} options - The timeout options.
	 */
	async focus(input: string | Locator, options?: TimeoutOption): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.focus(options);
	}

	/**
	 * Drags and drops a specified element to a destination.
	 * @param {string | Locator} input - The element to drag.
	 * @param {string | Locator} dest - The destination to drop the element at.
	 * @param {DragOptions} options - The drag options.
	 */
	async dragAndDrop(
		input: string | Locator,
		dest: string | Locator,
		options?: DragOptions,
	): Promise<void> {
		const drag = await this.getLocator(input);
		const drop = await this.getLocator(dest);
		await drag.dragTo(drop, options);
	}

	/**
	 * Double clicks on a specified element.
	 * @param {string | Locator} input - The element to double click on.
	 * @param {DoubleClickOptions} options - The double click options.
	 */
	async doubleClick(input: string | Locator, options?: DoubleClickOptions): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.dblclick(options);
	}

	/**
	 * Downloads a file from a specified element.
	 * @param {string | Locator} input - The element to download the file from.
	 * @param {string} path - The path to save the downloaded file to.
	 */
	async downloadFile(input: string | Locator, path: string): Promise<void> {
		const locator = await this.getLocator(input);
		const downloadPromise = this.getPage().waitForEvent('download');
		await this.click(locator);
		const download = await downloadPromise;
		// Wait for the download process to complete
		console.log(await download.path());
		// Save downloaded file somewhere
		await download.saveAs(path);
	}

	/**
	 * Uploads files to a specified element.
	 * @param {string | Locator} input - The element to upload files to.
	 * @param {UploadValues} path - The files to upload.
	 * @param {UploadOptions} options - The upload options.
	 */
	async uploadFiles(
		input: string | Locator,
		path: UploadValues,
		options?: UploadOptions,
	): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.setInputFiles(path, options);
	}

	/**
	 * Scrolls a specified element into view.
	 * @param {string | Locator} input - The element to scroll into view.
	 * @param {TimeoutOption} options - The timeout options.
	 */
	async scrollLocatorIntoView(input: string | Locator, options?: TimeoutOption): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.scrollIntoViewIfNeeded(options);
	}

	/**
	 * 4. JS: This section contains functions that use JavaScript to interact with elements on a web page.
	 * These functions include clicking on an element using JavaScript.
	 */

	/**
	 * Clicks on a specified element using JavaScript.
	 * @param {string | Locator} input - The element to click on.
	 * @param {TimeoutOption} options - The timeout options.
	 */
	async clickByJS(input: string | Locator, options?: TimeoutOption): Promise<void> {
		const locator = await this.getLocator(input);
		await locator.evaluate('el => el.click()', options);
	}
}
