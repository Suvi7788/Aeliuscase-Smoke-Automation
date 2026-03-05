const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const CostSection = require("../../../../pages/case/CostSection");



test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add New Cost', () => {
    test.setTimeout(60000);
    test('Add New Cost', async ({ page }) => {
        const menu = new Menu(page);
        const caseSummarySection = new CaseSummarySection(page);
        const settlementSection = new SettlementSection(page);
        const costSection = new CostSection(page);
        await menu.searchForCase(settlementData.caseNo);
        await caseSummarySection.hoverOverInjuryDetails();
        await settlementSection.openNotHasSettlement();
        await settlementSection.openCosts();
        await costSection.requestGenaralCheck();
        await costSection.neededDateInput();
        await costSection.amountInput();
        await costSection.save();
        await costSection.verifySaveSuccessMsg();

    })
})