const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test('Search Case', async ({ page }) => {
    const firmDashboardPage = new FirmDashboardPage(page);
    const caseDashboardPage = new CaseDashboardPage(page);
    await firmDashboardPage.searchForCase('AE00147');
    // await caseDashboardPage.verifyNavigationToCase();
});
