const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const FeeSection = require("../../../../pages/case/FeeSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add Settlements', () => {
    test('Add Settlements', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const feeSection = new FeeSection(page);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openNotHasSettlement();
        await feeSection.viewFeesOption();
        await feeSection.viewFeeClick();
        await feeSection.viewAttorneyFeeVisible();


    })
})
