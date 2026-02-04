const { test } = require("@playwright/test");
const SettlementSection = require("../../../../pages/case/SettlementSection");
const settlementData = require("../../../../data/settlementData.json");
const { Menu } = require("../../../../pages/Menu");
const CaseSummarySection = require("../../../../pages/case/CaseSummarySection");
const PDRatingSection = require("../../../../pages/case/pdRatingSection");



test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Update PDRatings', () => {
    test.setTimeout(60000);
    test('Update PDRatings', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const pdRatingSection = new PDRatingSection(page);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openNotHasSettlement();
        await settlementSection.openPDRatings();
        await pdRatingSection.clickPDRatingOption();
        await pdRatingSection.updatePdRating();
        await pdRatingSection.addRecommendedFutureMedicalCare(settlementData.recommendedFutureMedicalCareTxt);
        await pdRatingSection.savePdRating();
        await pdRatingSection.verifySaveSuccessMsg();

       
    })
})

