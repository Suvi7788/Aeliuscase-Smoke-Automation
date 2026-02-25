const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { CasePage } = require("../../pages/CasePage");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test('Navigate to a case from case List @smoke', async ({ page }) => {
    const menu = new Menu(page);
    await menu.navigate('cases','activeCases');
    const casePage = new CasePage(page);
    await casePage.navigateToACase();
    await casePage.verifyCaseNavigation();
});


test('Navigate to a case from case tile @smoke', async ({ page }) => {
const firmDashboardPage = new FirmDashboardPage(page);
    await firmDashboardPage.navigateToACase();
    await firmDashboardPage.verifyCaseNavigation();
});