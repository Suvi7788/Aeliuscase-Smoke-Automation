const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const DeductionSection = require("../../../../pages/case/DeductionSection");



test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add New Cost', () => {
    test.setTimeout(60000);
    test('Add New Cost', async ({ page }) => {
        const menu = new Menu(page);
        const caseSummarySection = new CaseSummarySection(page);
        const settlementSection = new SettlementSection(page);
        await menu.searchForCase(settlementData.caseNo);
        await caseSummarySection.hoverOverInjuryDetails();
        await settlementSection.openNotHasSettlement();
        await settlementSection.openDeduction();
        const deductionSection = new DeductionSection(page);
        await deductionSection.openAddNewCost();
        await deductionSection.addAmount();
        await deductionSection.save();
        await deductionSection.verifySaveSuccessMsg();
    });
});