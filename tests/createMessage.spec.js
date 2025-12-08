const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const messageData = require("../data/messageData.json");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test.describe('Firm Dashboard message Creation', () => {
    test('Create Firm Dashboard message', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.createFirmDashboardMessage(messageData.caseNo, messageData.user, messageData.Details);
    })
})
