const { test } = require("@playwright/test");
const { PrintPreviewPopup } = require("../pages/components/PrintPreviewPopup");
const { Menu } = require("../pages/Menu");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Verify Recent Cases Print', () => {
    test('Verify Recent Cases Print', async ({ page }) => {
        const printPreviewPopup = new PrintPreviewPopup(page);
        const menu = new Menu(page);
        await menu.navigate("case", "recentCases");
        await printPreviewPopup.verifyPrintCaseButtonVisible();
        await printPreviewPopup.clickPrintCaseButton();
        await printPreviewPopup.verifyRecentCaseDataLoadingToPrint();
        await printPreviewPopup.verifyRecentCaseDataLoadingToPrint();
        await printPreviewPopup.recentCasePrintButton.click();
        

    })
})
