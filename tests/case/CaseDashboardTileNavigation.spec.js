const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const { FirmTaskListPage } = require("../../pages/FirmTaskListPage");
const { FirmEventListPage } = require("../../pages/FirmEventListPage");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const { CaseTaskListPage } = require("../../pages/CaseTaskListPage");
const { caseEventList } = require("../../config/endpoints");
const { CaseTabs } = require("../../pages/case/CaseTabs");
const { Menu } = require("../../pages/Menu");
const caseData = require("../../data/caseData.json");
const { CaseOverviewPage } = require("../../pages/CaseOverviewPage");


test.describe('Firm Dashboard Tile Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Navigate to Case Task List @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.navigateToTaskList();
        await caseOverview.caseTabs.verifyTabLoaded('tasks');

    })
    test('Navigate to Case Event List @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.navigateToEventList();
        await caseOverview.caseTabs.verifyTabLoaded('calendar');

    })
    test('Navigate to Case Note List @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.navigateToNoteList();
        await caseOverview.caseTabs.verifyTabLoaded('notes');

    })

})