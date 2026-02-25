// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Choose env: qa (default) or uat
const ENV = process.env.ENV || 'qa';

// Load .env.<env>
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });

export default defineConfig({
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results.xml' }],
    ['html', { open: 'never' }],
  ],
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  timeout: 100000,

  use: {
    headless: true,
    slowMo: 5000,

    // ✅ baseURL comes from env file
    baseURL: process.env.BASE_URL,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // ✅ keep separate storage state per env (so QA login doesn’t overwrite UAT)
    storageState: `storageState.${ENV}.json`,
  },

  globalSetup: './tests/setup/global-setup.js',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
