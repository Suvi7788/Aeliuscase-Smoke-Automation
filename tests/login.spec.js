// Import Playwright test functions (test, expect)
const { test, expect } = require('@playwright/test');

// Import the LoginPage class from the pages folder
const { LoginPage } = require('../pages/LoginPage')

// Grouping tests under "Login Tests"
test.describe('Login Tests', () => {

    // Single test: checks if login works with correct credentials
    test('Successful login with valid credentials', async ({ page }) => {

        // Create an object of LoginPage and pass the Playwright page fixture
        const loginPage = new LoginPage(page);

        // Step 1: Navigate to the login page
        await loginPage.gotoLogin();

        // Step 2: Enter valid username + password and click login button
        await loginPage.login('suvid', 'Aelius@1234');

        // Step 3: Wait until the URL changes to dashboard 
        await page.waitForURL(/dashboard/);

        // Step 4: Assert → The URL should contain “dashboard”
        await expect(page).toHaveURL(/dashboard/);

    });

});