const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../../pages/FirmDashboardPage');
const { PrintPreviewPopup } = require('../../pages/components/PrintPreviewPopup');

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Task Tile Print', () => {
    test('Verify Task Tile Print', async ({ page }) => {
       const firmDashboardPage = new FirmDashboardPage(page);
       const printPreviewPopup = new PrintPreviewPopup(page);
       await firmDashboardPage.verifyPrintButtonVisible();
       await firmDashboardPage.openTaskPrintviewPopup();
       await printPreviewPopup.verifyTaskPrintButtonVisible();
       await printPreviewPopup.clickTaskPrintButton();
       await printPreviewPopup.verifyTaskDataLoadingToPrint();

    })
})
