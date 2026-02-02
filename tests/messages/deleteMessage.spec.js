const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const { FirmMessageListPage } = require("../../pages/FirmMessageListPage");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test('Delete Message from Message Tile', async ({ page }) => {
    const firmDashboardPage = new FirmDashboardPage(page);
    await firmDashboardPage.deleteMessage();
    await firmDashboardPage.verifyDeleteMessage();
})

test('Delete Message from Message List', async ({ page }) => {
    const firmDashboardPage = new FirmDashboardPage(page);
    await firmDashboardPage.navigateToMessageList(); 
    const firmMessageListPage = new FirmMessageListPage(page);
    await firmMessageListPage.deleteMessage();
    await firmMessageListPage.verifyDeleteMessage();
})
