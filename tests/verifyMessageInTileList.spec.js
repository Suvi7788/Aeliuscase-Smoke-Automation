// tests/setup/verifyMessageInTileList.spec.js
const { test, expect } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { FirmMessageListPage } = require("../pages/FirmMessageListPage");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Verify Message in Tile list loads', () => {
    test('Verify Message in Tile list loads', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.verifyMessageListLoads();
    })
})

test.describe('Verify Message List loads', () => {
    test('Verify Message List loads', async ({ page }) => {
        const firmMessageListPage = new FirmMessageListPage(page);
        await firmMessageListPage.verifyMessageInMessageList();
    })
})

