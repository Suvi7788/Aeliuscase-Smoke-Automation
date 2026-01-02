const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../../pages/FirmDashboardPage');
const routes = require('../../config/routes');



test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Verify View Message', () => {
    test('Verify View Message', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.verifyViewMessage();
    });
});