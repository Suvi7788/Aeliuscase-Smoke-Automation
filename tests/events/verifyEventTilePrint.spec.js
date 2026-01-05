const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../../pages/FirmDashboardPage');
const { PrintPreviewPopup } = require('../../pages/components/PrintPreviewPopup');

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Event Tile Print', () => {
    test('Verify Event Tile Print', async ({ page }) => {
       const firmDashboardPage = new FirmDashboardPage(page);
       const printPreviewPopup = new PrintPreviewPopup(page);
       await firmDashboardPage.verifyPrintButtonVisible();
       await firmDashboardPage.openEventPrintviewPopup();
       await printPreviewPopup.verifyEventPrintButtonVisible();
       await printPreviewPopup.clickEventPrintButton();
       await printPreviewPopup.verifyEventDataLoadingToPrint();

    })
})

