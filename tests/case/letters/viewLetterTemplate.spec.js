const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const {CaseDashboardSection} = require("../../../pages/case/CaseDashboardSection");
const caseData = require("../../../data/caseData.json");
const {CaseTabs} = require("../../../pages/case/CaseTabs");
const {CaseOverviewPage} = require("../../../pages/CaseOverviewPage");
const {LettersSection} = require("../../../pages/case/lettersSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Compose Letter', () => {
    test('Compose Letter @smoke', async ({ page }) => {
        
        test.timeout = 60000;
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('letters');
        const lettersSection = new LettersSection(page);
        await lettersSection.clickOptions();
        await lettersSection.openViewLetterTemplate();
        await lettersSection.verifyViewLetterTemplate();
        
        
    })
})