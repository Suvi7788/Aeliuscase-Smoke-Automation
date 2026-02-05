const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const FeeSection = require("../../../../pages/case/FeeSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Editing Added Bill', () => {
    test('Editing Added Bill', async ({ page }) => {
        test.timeOut = 60000;
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const feeSection = new FeeSection(page);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openHasSettlement();

        // Open bill options and click edit
        await feeSection.openEditFeeForUnpaidRow();


        // Edit bill details
        await feeSection.editBill(settlementData.comment);

        // Save changes
        await feeSection.saveBill();

        // Verify success message
        await feeSection.editFeeSuccessMsgVisible();
    })
})