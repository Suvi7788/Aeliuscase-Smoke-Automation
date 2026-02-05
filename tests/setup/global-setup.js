// Load .env only if variables are not already provided (CI will provide them)
if (!process.env.TEST_USERNAME) {
    require('dotenv').config();
}

const { chromium } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

async function globalSetup() {
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    if (!username || !password) {
        throw new Error('Missing TEST_USERNAME or TEST_PASSWORD environment variables');
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);

    await page.goto('https://qa.aeliuscase.com/login');
    await loginPage.login(username, password);
    await page.waitForURL(/dashboard/);

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

module.exports = globalSetup;
