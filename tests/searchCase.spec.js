const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const {Menu} = require("../pages/Menu");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test('Search Case', async ({ page }) => {
    const menu = new Menu(page);
    const caseDashboardPage = new CaseDashboardPage(page);
    await menu.searchForCase('AE00147');
    // await caseDashboardPage.verifyNavigationToCase();
});
