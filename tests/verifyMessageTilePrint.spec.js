const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../pages/FirmDashboardPage');
const { PrintPreviewPopup } = require('../pages/components/PrintPreviewPopup');

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Message Tile Print', () => {
    test('Verify Message Tile Print', async ({ page }) => {
       const firmDashboardPage = new FirmDashboardPage(page);
       const printPreviewPopup = new PrintPreviewPopup(page);
       await firmDashboardPage.verifyPrintButtonVisible();
       await firmDashboardPage.msgPrintviewPopup();
       await printPreviewPopup.verifyPrintButtonVisible();
       await printPreviewPopup.clickPrintButton();
       await printPreviewPopup.verifyDataLoadingToPrint();

    })
})
