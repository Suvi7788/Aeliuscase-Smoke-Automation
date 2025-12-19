const { test } = require("@playwright/test");
const { CaseDashboardSection } = require("../pages/sections/CaseDashboardSection");
const { Menu } = require("../pages/Menu");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test('Search Case', async ({ page }) => {
    const menu = new Menu(page);
    const caseDashboardSection = new CaseDashboardSection(page);
    await menu.searchForCase('AE00147');
    await caseDashboardSection.verifyNavigationToCase();
});
