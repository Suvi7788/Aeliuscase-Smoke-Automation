const { test, expect } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");

test.describe('Verify Dashboard Case List loads', () => {
    test('Verify Dashboard Case List loads', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.verifyCaseInTileList();
    })
})