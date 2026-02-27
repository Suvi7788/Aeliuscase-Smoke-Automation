const dotenv = require('dotenv');
const path = require('path');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

// ENV defaults to uat
const ENV = process.env.ENV || 'uat';

// Load the matching env file (so globalSetup also has BASE_URL/creds)
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });

async function globalSetup(config) {
  const baseURL = process.env.BASE_URL || (config.projects?.[0]?.use?.baseURL);
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!baseURL) throw new Error('Missing BASE_URL');
  if (!username || !password) {
    throw new Error('Missing TEST_USERNAME or TEST_PASSWORD environment variables');
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  // ✅ no hardcode: uses baseURL
  await page.goto(`${baseURL}/login`);

  await loginPage.login(username, password);
  await page.waitForURL(/dashboard/);

  // ✅ save per env
  await page.context().storageState({ path: `storageState.${ENV}.json` });

  await browser.close();
}

module.exports = globalSetup;
