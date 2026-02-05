const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const NegotiationSection = require("../../../../pages/case/NegotiationSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add New Negotiation', () => {
    test.setTimeout(60000);
    test('Add New Negotiation @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseSummarySection = new CaseSummarySection(page);
        const settlementSection = new SettlementSection(page);
        const negotiationSection = new NegotiationSection(page);
        await menu.searchForCase(settlementData.caseNo);
        await caseSummarySection.hoverOverInjuryDetails();
        await settlementSection.openNotHasSettlement();
        await settlementSection.openNegotiations();
        await negotiationSection.clickNegotiationOption();
        await negotiationSection.clickViewNegotiation();
        await negotiationSection.verifyViewNegotiation();
    })
})
