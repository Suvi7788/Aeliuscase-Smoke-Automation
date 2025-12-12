const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const eventData = require("../data/eventData.json");
const { Menu } = require("../pages/Menu");
const { FirmEventListPage } = require("../pages/FirmEventListPage");
const { CaseEventListPage } = require("../pages/CaseEventListPage");
const { CaseTabs } = require("../pages/components/CaseTabs");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test.describe('Firm Dashboard Event Creation', () => {
    test('Create Firm Dashboard Event', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.createFirmDashboardEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    })
})

test.describe('Case Dashboard Event Creation', () => {
    test('Create Case Dashboard Event', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardPage = new CaseDashboardPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseDashboardPage.createCaseDashboardEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    })
})

test.describe('Firm Event List Event Creation', () => {
    test('Create Firm Event List Event', async ({ page }) => {
        const firmEventListPage = new FirmEventListPage(page);
        const menu = new Menu(page);
        await menu.navigateToFirmEventList();
        await firmEventListPage.createFirmEventListEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    })
})


test.describe('Case Event List Event Creation', () => {
    test('Create Case Event List Event', async ({ page }) => {
        const menu = new Menu(page);
        const caseEventListPage = new CaseEventListPage(page);
        const caseTabs = new CaseTabs(page);
        await menu.searchForCase(eventData.caseNo);
        await caseTabs.navigateToCaseEventList();
        await caseEventListPage.createCaseEventListEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    })
})