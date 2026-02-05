const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const { Menu } = require("../../pages/Menu");
const { FirmEventListPage } = require("../../pages/FirmEventListPage");
const { CaseEventListPage } = require("../../pages/CaseEventListPage");
const { CaseOverviewPage } = require("../../pages/CaseOverviewPage");
const caseData = require("../../data/caseData.json");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});


test.describe('Event Creation', () => {
    test('Delete Firm Dashboard Event', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.deleteEvent();
        await firmDashboardPage.verifyDeleteEvent();
    })

    test('Delete Case Dashboard Event', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.deleteEvent();
        await caseDashboardSection.verifyDeleteEvent();
    })

    test('Delete Firm Event List Event @smoke', async ({ page }) => {
        const firmEventListPage = new FirmEventListPage(page);
        const menu = new Menu(page);
        await menu.navigate("calendar", "firmEventList");
        await firmEventListPage.deleteEvent();
        await firmEventListPage.verifyDeleteEvent();
    })


    test('Delete Case Event List Event', async ({ page }) => {
        const menu = new Menu(page);
        const caseEventListPage = new CaseEventListPage(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('calendar');
        await caseEventListPage.deleteEvent();
        await caseEventListPage.verifyDeleteEvent();
    })


})
