const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseDashboardSection } = require("../../../pages/case/CaseDashboardSection");
const { CaseOverviewPage } = require("../../../pages/CaseOverviewPage");
const caseData = require("../../../data/caseData.json");
const { LegalFormsSection } = require("../../../pages/case/legalFormsSection");
const { CasePage } = require("../../../pages/CasePage");





test.describe('Create Note', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('Create Note From Case Dashboard', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('legalForms');
        const legalFormsSection = new LegalFormsSection(page);
        await legalFormsSection.addLegalForm();
        await legalFormsSection.mergeLegalForm();
        await legalFormsSection.saveLegalForm();
    })
})