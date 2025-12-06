const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const eventData = require("../data/eventData.json");

test.describe('Firm Dashboard Event Creation', () => {
    test('Create Firm Dashboard Event', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const firmDashboardPage = new FirmDashboardPage(page);
        await loginPage.gotoLogin();
        await loginPage.login('suvid', 'Aelius@1234');
        await firmDashboardPage.createFirmDashboardEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    })
})