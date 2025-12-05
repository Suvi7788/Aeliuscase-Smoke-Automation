const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage')

test.describe('Login Tests', () => {
    test('Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLogin();
        await loginPage.login('suvid', 'Aelius@1234');

        await page.waitForURL(/dashboard/);
        await expect(page).toHaveURL(/dashboard/);

    });
});