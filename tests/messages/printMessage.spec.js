const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const { PrintPreviewPopup } = require("../../pages/components/PrintPreviewPopup");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Print Message List', () => {
    test('Verify Print Message List', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.navigateToMessageList();
        const printPreviewPopup = new PrintPreviewPopup(page);
        await firmDashboardPage.verifyPrintButtonVisible();
        await firmDashboardPage.openMsgPrintviewPopup();
        await printPreviewPopup.verifyMsgPrintButtonVisible();
        await printPreviewPopup.clickMsgPrintButton();
        await printPreviewPopup.verifyMsgDataLoadingToPrint();
        
        
    })

})
test.describe('Message Tile Print', () => {
    test('Verify Message Tile Print', async ({ page }) => {
       const firmDashboardPage = new FirmDashboardPage(page);
       const printPreviewPopup = new PrintPreviewPopup(page);
       await firmDashboardPage.verifyPrintButtonVisible();
       await firmDashboardPage.openMsgPrintviewPopup();
       await printPreviewPopup.verifyMsgPrintButtonVisible();
       await printPreviewPopup.clickMsgPrintButton();
       await printPreviewPopup.verifyMsgDataLoadingToPrint();

    })
})