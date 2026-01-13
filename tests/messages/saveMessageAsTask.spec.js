const { test } = require("@playwright/test");
const { MessageForm } = require("../../pages/components/MessageForm");
const { Menu } = require("../../pages/Menu");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const messageData = require("../../data/messageData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Firm Dashboard Save Message As Task', () => {
    test('Firm Dashboard Save Message As Task', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const messageForm = new MessageForm(page);
        await firmDashboardPage.openMessageForm();
        await messageForm.fillMessageAsTaskTest(messageData.caseNo, messageData.user, messageData.Details);
        await messageForm.fillAddTask();
        await messageForm.fillAssignee(messageData.AssigneeValue);
        await messageForm.assigneeClick();
        await messageForm.submitMessageForm();
        await firmDashboardPage.verifyMessageAndTaskCreation();
    })
})