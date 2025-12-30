const { test } = require("@playwright/test");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");
const { CaseOverviewPage } = require("../pages/CaseOverviewPage");
const { Menu } = require("../pages/Menu");


test.describe('Verify Case List Options', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('Verify Review Note Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.reviewNote);
        await caseOverview.caseTabs.verifyTabLoaded('notes');
    })

    test('Verify Review Document Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.manageDocuments);
        await caseOverview.caseTabs.verifyTabLoaded('documents');
    })

    test('Verify Review Calendar Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.viewCalendar);
        await caseOverview.caseTabs.verifyTabLoaded('calendar');
    })

    test('Verify Review Activity Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.reviewActivity);
        await caseOverview.caseTabs.verifyTabLoaded('activity');
    })

    test('Verify Review Letter Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseOverview = new CaseOverviewPage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.composeALetter);
        await caseOverview.caseTabs.verifyTabLoaded('letters');
    })
})