const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { CasePage } = require("../../pages/CasePage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test('Navigate to a case @smoke', async ({ page }) => {
    const menu = new Menu(page);
    await menu.navigate('cases','activeCases');
    const casePage = new CasePage(page);
    await casePage.navigateToACase();
    await casePage.verifyCaseNavigation();
});