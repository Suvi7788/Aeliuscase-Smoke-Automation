const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const { Menu } = require("../../pages/Menu");
const { FirmEventListPage } = require("../../pages/FirmEventListPage");
const { CaseEventListPage } = require("../../pages/CaseEventListPage");
const { CaseOverviewPage } = require("../../pages/CaseOverviewPage");
const caseData = require("../../data/caseData.json");
const { EventForm } = require("../../pages/components/EventForm");
const eventData = require("../../data/eventData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test.describe('Event Edit', () => {
    test('Edit Firm Dashboard Event', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.editEvent();
        const eventForm = new EventForm(page);
        await eventForm.editEventForm(eventData.Assignee, eventData.editDescription);
        await eventForm.submitEventForm();
        await firmDashboardPage.verifyEventUpdate();
    })

    test('Edit Case Dashboard Event', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.editEvent();
        const eventForm = new EventForm(page);
        await eventForm.editEventForm(eventData.Assignee, eventData.editDescription);
        await eventForm.submitEventForm();
        await caseDashboardSection.verifyEventUpdate();
    })

    test('Edit Firm Event List Event', async ({ page }) => {
        const firmEventListPage = new FirmEventListPage(page);
        const menu = new Menu(page);
        await menu.navigate("calendar", "firmEventList");
        await firmEventListPage.editEvent();
        const eventForm = new EventForm(page);
        await eventForm.editEventForm(eventData.Assignee, eventData.editDescription);
        await eventForm.submitEventForm();
        await firmEventListPage.verifyEventUpdate();
    })


    test('Edit Case Event List Event @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseEventListPage = new CaseEventListPage(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('calendar');
        await caseEventListPage.editEvent();
        const eventForm = new EventForm(page);
        await eventForm.editEventForm(eventData.Assignee, eventData.editDescription);
        await eventForm.submitEventForm();
        await caseEventListPage.verifyEventUpdate();
    })


})
