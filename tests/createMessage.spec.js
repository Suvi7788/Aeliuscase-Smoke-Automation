const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const messageData = require("../data/messageData.json");
const { FirmMessageListPage } = require("../pages/FirmMessageListPage");
const { MessageForm } = require("../pages/components/MessageForm");
const { CasePage } = require("../pages/CasePage");
const { Menu } = require("../pages/Menu");
const { caseListOptions } = require("../config/caseListOptions");

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
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.navigateToMessageList();
        const firmMessageListPage = new FirmMessageListPage(page);
        await firmMessageListPage.createFirmMessageListMessage(messageData.caseNo, messageData.user, messageData.Details);
        await firmMessageListPage.verifyMessageCreation();
    })
})

//Create Message From Case List(Cases→Recent Cases→case options→Add Phone message)
test('Create Message From Case List((Cases→Recent Cases→case options→Add Phone message))', async ({ page }) => {
    const messageForm = new MessageForm(page);
    const casePage = new CasePage(page);
    const menu = new Menu(page);
    await menu.navigate("case", "recentCases");
    await casePage.openCaseListOption(caseListOptions.addPhoneMessage);
    await messageForm.fillMessageForm(messageData.caseNo, messageData.user, messageData.Details);
    await messageForm.submitMessageForm();
    await casePage.verifyRecordCreation();

})

