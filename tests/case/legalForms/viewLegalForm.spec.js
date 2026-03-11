const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseDashboardSection } = require("../../../pages/case/CaseDashboardSection");
const { CaseOverviewPage } = require("../../../pages/CaseOverviewPage");
const caseData = require("../../../data/caseData.json");
const { LegalFormsSection } = require("../../../pages/case/legalFormsSection");
const { CasePage } = require("../../../pages/CasePage");





test.describe('View Legal Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('View Legal Form From Case Dashboard', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('legalForms');
        const legalFormsSection = new LegalFormsSection(page);
        await legalFormsSection.option();
        await legalFormsSection.view();
        await legalFormsSection.viewVerifyLegalForm();
    })
})