const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const PDRatingSection = require("../../../../pages/case/pdRatingSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add New PDRatings', () => {
    test.setTimeout(60000);
    test('Add New PDRatings', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const pdRatingSection = new PDRatingSection(page);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openNotHasSettlement();
        await settlementSection.openPDRatings();
        await pdRatingSection.addNewPdRating();
        await pdRatingSection.selectDateOfReport();
        await pdRatingSection.drSelect();
        await pdRatingSection.typeOfRPTSelect();
        await pdRatingSection.savePdRating();
        await pdRatingSection.verifySaveSuccessMsg();

        
    })
})