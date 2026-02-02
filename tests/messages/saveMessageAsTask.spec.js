const { test } = require("@playwright/test");
const { MessageForm } = require("../../pages/components/MessageForm");
const { Menu } = require("../../pages/Menu");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const messageData = require("../../data/messageData.json");
const { FirmMessageListPage } = require("../../pages/FirmMessageListPage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Message Tile Save Message As Task', () => {
    test('Message Tile Save Message As Task', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const messageForm = new MessageForm(page);
        await firmDashboardPage.openMessageForm();
        await messageForm.fillMessageAsTaskTest(messageData.caseNo, messageData.user, messageData.Details);
        await messageForm.fillAddTask(messageForm.AddTaskBtn);
        await messageForm.fillAssignee(messageData.AssigneeValue);
        await messageForm.assigneeClick();
        await messageForm.submitMessageForm();
        await firmDashboardPage.verifyMessageAndTaskCreation();
    })
})

    test('Message List Save Message As Task', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.navigateToMessageList();
        const firmMessageListPage = new FirmMessageListPage(page);
        const messageForm = new MessageForm(page);
        await firmMessageListPage.openMessageForm();
        await messageForm.fillMessageAsTaskTest(messageData.caseNo, messageData.user, messageData.Details);
        await messageForm.fillAddTask();
        await messageForm.fillAssignee(messageData.AssigneeValue);
        await messageForm.assigneeClick();
        await messageForm.submitMessageForm();
        await firmDashboardPage.verifyMessageAndTaskCreation();
    })
