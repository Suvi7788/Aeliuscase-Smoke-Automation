const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");

test('Search Case', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const firmDashboardPage = new FirmDashboardPage(page);
    const caseDashboardPage = new CaseDashboardPage(page);

    await loginPage.gotoLogin();
    await loginPage.login('suvid', 'Aelius@1234');
    await firmDashboardPage.searchForCase('AE00147');
    // await caseDashboardPage.verifyNavigationToCase();
});
