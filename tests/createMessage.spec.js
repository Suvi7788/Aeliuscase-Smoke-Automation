const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const messageData = require("../data/messageData.json");
const { FirmMessageListPage } = require("../pages/FirmMessageListPage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test.describe('Firm Dashboard message Creation', () => {
    test('Create Firm Dashboard message', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.createFirmDashboardMessage(messageData.caseNo, messageData.user, messageData.Details);
        await firmDashboardPage.verifyMessageAndTaskCreation();
    })
})

test.describe('Firm Message List message Creation', () => {
    test('Create Firm Message List message', async ({ page }) => {
        const firmMessageListPage = new FirmMessageListPage(page);
        await firmMessageListPage.createFirmMessageListMessage(messageData.caseNo, messageData.user, messageData.Details);
        await firmMessageListPage.verifyMessageCreation();
    })
})

