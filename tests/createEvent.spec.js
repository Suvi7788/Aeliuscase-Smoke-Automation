const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseDashboardSection } = require("../pages/sections/CaseDashboardSection");
const eventData = require("../data/eventData.json");
const { Menu } = require("../pages/Menu");
const { FirmEventListPage } = require("../pages/FirmEventListPage");
const { CaseEventListPage } = require("../pages/CaseEventListPage");
const { CaseOverviewPage } = require("../pages/CaseOverviewPage");
const { EventForm } = require("../pages/components/EventForm");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");

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
        const caseDashboardSection = new CaseDashboardSection(page);
        await menu.searchForCase(eventData.caseNo);
        await caseDashboardSection.createCaseDashboardEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
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
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseOverview.caseTabs.open('calendar');

        await caseEventListPage.createCaseEventListEvent(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    })
})

test('Create Event From Case List', async ({ page }) => {
    const eventForm = new EventForm(page);
    const casePage = new CasePage(page);
    const menu = new Menu(page);
    await menu.navigateToRecentCase();
    await casePage.openCaseListOption(caseListOptions.addEvent);
    await eventForm.fillEventForm(eventData.caseNo, eventData.Subject, eventData.Assignee, eventData.Description);
    await eventForm.submitEventForm();
    await casePage.verifyEventCreation();
})