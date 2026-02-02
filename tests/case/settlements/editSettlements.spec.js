const { test } = require("@playwright/test");
const SettlementSection = require("../../../pages/case/SettlementSection");
const settlementData = require("../../../data/settlementData.json");
const { Menu } = require("../../../pages/Menu");
const CaseSummarySection = require("../../../pages/case/CaseSummarySection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Edit Settlement', () => {
    test('Edit Settlement', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openHasSettlement();
        await settlementSection.editSettlement();

    })
})