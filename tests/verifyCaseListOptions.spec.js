const { test } = require("@playwright/test");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");
const { CaseTabs } = require("../pages/components/CaseTabs");
const { Menu } = require("../pages/Menu");



test.describe('Verify Case List Options', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('Verify Review Note Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseTabs = new CaseTabs(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.reviewNote);
        await caseTabs.verifyCaseTabNavigation(caseTabs.NoteSectionLocator);
        await caseTabs.verifyCaseTabRoute(caseTabs.NoteTabRoute);
    })

    test('Verify Review Document Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseTabs = new CaseTabs(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.manageDocuments);
        await caseTabs.verifyCaseTabNavigation(caseTabs.DocumentSectionLocator);
        await caseTabs.verifyCaseTabRoute(caseTabs.DocumentTabRoute);
    })

    test('Verify Review Calendar Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseTabs = new CaseTabs(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.viewCalendar);
        await caseTabs.verifyCaseTabNavigation(caseTabs.CalendarSectionLocator);
        await caseTabs.verifyCaseTabRoute(caseTabs.CalendarTabRoute);
    })

    test('Verify Review Activity Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseTabs = new CaseTabs(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.reviewActivity);
        await caseTabs.verifyCaseTabNavigation(caseTabs.ActivitySectionLocator);
        await caseTabs.verifyCaseTabRoute(caseTabs.ActivityTabRoute);
    })

    test('Verify Review Letter Options', async ({ page }) => {
        const casePage = new CasePage(page);
        const caseTabs = new CaseTabs(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.composeALetter);
        await caseTabs.verifyCaseTabNavigation(caseTabs.LetterSectionLocator);
        await caseTabs.verifyCaseTabRoute(caseTabs.LetterTabRoute);
    })
})