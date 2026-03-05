const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const {CaseDashboardSection} = require("../../../pages/case/CaseDashboardSection");
const caseData = require("../../../data/caseData.json");
const {CaseTabs} = require("../../../pages/case/CaseTabs");
const {CaseOverviewPage} = require("../../../pages/CaseOverviewPage");
const {TextMessage} = require("../../../pages/case/TextMessage");
const textMessageData = require("../../../data/textMessageData.json");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add New Text Message', () => {
    test('Add New Text Message @smoke', async ({ page }) => {
        
        test.timeout = 60000;
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('textMessage');
        const textMessage = new TextMessage(page);
        // have to complete this test case
    })
})