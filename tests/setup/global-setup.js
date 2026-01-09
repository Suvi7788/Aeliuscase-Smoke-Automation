require('dotenv').config();
const { test, expect, chromium } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage')

/**
 * Global setup for Playwright tests
 * Logs in once and saves authentication state to storageState.json
 * so all tests can start already logged in.
 */
async function globalSetup() {
    // Launch a new browser instance
    const browser = await chromium.launch({ headless: false });
    // Create a new browser context (isolated session)
    const context = await browser.newContext();
    // Open a new page in this context
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    // Navigate directly to login page (full URL required in global setup)
    await page.goto("https://qa.aeliuscase.com/login");
    // Perform login using credentials from environment variables
    await loginPage.login(process.env.USER, process.env.PASS);
    await page.waitForURL(/dashboard/);
    // Save the browser context's storage state to a file
    // This allows tests to reuse this login session without logging in again
    await page.context().storageState({ path: 'storageState.json' });
    // Close the browser after saving the session
    await browser.close();

}
module.exports = globalSetup;
