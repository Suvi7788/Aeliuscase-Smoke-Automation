const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const {CaseDashboardSection} = require("../../../pages/case/CaseDashboardSection");
const caseData = require("../../../data/caseData.json");
const {CaseTabs} = require("../../../pages/case/CaseTabs");
const {CaseOverviewPage} = require("../../../pages/CaseOverviewPage");
const MedIndexSection = require("../../../pages/case/MedIndexSection");





test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('add Medindex', () => {
    test('add Medindex @smoke', async ({ page }) => {
        
        test.timeout = 60000;
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('medIndex');
        const medIndexSection = new MedIndexSection(page);
        await medIndexSection.addMedIndex();
        await medIndexSection.selectMedicalProviderClick();
        await medIndexSection.selectMedicalProviderOptionClick();
        await medIndexSection.examDate();
        await medIndexSection.serveDate();
        await medIndexSection.save();
    })
})