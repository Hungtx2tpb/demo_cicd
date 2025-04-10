import path from 'path';

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

import { WaitForLoadStateOptions } from './src/utils/optional-parameter-types';
import {
	ACTION_TIMEOUT,
	EXPECT_TIMEOUT,
	GLOBAL_TEST_TIMEOUT,
	TEST_TIMEOUT,
} from './src/constants/timeout_constant';
import { EnvironmentUtils } from './src/utils/environment-util';

export const LOADSTATE: WaitForLoadStateOptions = 'domcontentloaded';

// setup environment and market
const market = process.env.market!;
const environment = process.env.env!;

console.log("market ", market);
console.log("environment ", environment);

const envFileName = EnvironmentUtils.getEnvironmentInfo(environment, market);
console.log("envFileName ", envFileName);

dotenv.config({ path: path.resolve(__dirname, './src/env', envFileName) });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: 1,
	reporter: [['./src/setup/custom-logger.ts'], ['html', { open: 'never' }], ['list']],
	use: {
		headless: false,
		trace: 'on',
		actionTimeout: ACTION_TIMEOUT,
		ignoreHTTPSErrors: true,
		acceptDownloads: true,
	},
	globalSetup: require.resolve('./src/setup/global-setup.ts'),
	globalTeardown: require.resolve('./src/setup/global-teardown.ts'),

	expect: {
		timeout: EXPECT_TIMEOUT,
	},
	timeout: TEST_TIMEOUT,
	globalTimeout: GLOBAL_TEST_TIMEOUT,
	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				viewport: null,
				launchOptions: { args: ['--start-maximized'], slowMo: 0 },
			},
		},
		// {
		// 	name: 'edge',
		// 	use: {
		// 		browserName: 'chromium',
		// 		channel: 'msedge',
		// 		viewport: null,
		// 		launchOptions: { args: ['--start-maximized'], slowMo: 0 },
		// 	},
		// },
		{
			name: 'webkit',
			use: {
				browserName: 'webkit',
				viewport: null,
				launchOptions: { args: ['--start-maximized'], slowMo: 0 },
			}
		}
	],
});
