const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseDashboardSection } = require("../../../pages/case/CaseDashboardSection");
const { CaseOverviewPage } = require("../../../pages/CaseOverviewPage");
const caseData = require("../../../data/caseData.json");
const { LegalFormsSection } = require("../../../pages/case/legalFormsSection");
const { CasePage } = require("../../../pages/CasePage");





test.describe('Navigate to Injury', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('Navigate to Injury', async ({ page }) => {
        const menu = new Menu(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('injury');
        await caseOverview.caseTabs.verifyInjuryTabLoaded();
    })
})