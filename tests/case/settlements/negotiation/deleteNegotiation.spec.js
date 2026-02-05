const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const NegotiationSection = require("../../../../pages/case/NegotiationSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Delete Negotiation', () => {
    test.setTimeout(60000);
    test('Delete Negotiation @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseSummarySection = new CaseSummarySection(page);
        const settlementSection = new SettlementSection(page);
        const negotiationSection = new NegotiationSection(page);
        await menu.searchForCase(settlementData.caseNo);
        await caseSummarySection.hoverOverInjuryDetails();
        await settlementSection.openNotHasSettlement();
        await settlementSection.openNegotiations();
        await negotiationSection.clickDeleteButton();
        await negotiationSection.clickDeleteConfirm();
        await negotiationSection.verifyDeleteSuccessMsg();
    })
})
