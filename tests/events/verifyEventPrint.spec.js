const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../../pages/FirmDashboardPage');
const { PrintPreviewPopup } = require('../../pages/components/PrintPreviewPopup');
const { Menu } = require('../../pages/Menu');
const { FirmTaskListPage } = require('../../pages/FirmTaskListPage');

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

test.describe('Event List Print', () => {
    test('Verify Event List Print', async ({ page }) => {
       const printPreviewPopup = new PrintPreviewPopup(page);
       const firmTaskListPage = new FirmTaskListPage(page);
       const menu = new Menu(page);
       await menu.navigate("calendar", "firmEventList");
       await firmTaskListPage.navigateToTaskPrintOptionDropdown();
       await firmTaskListPage.navigateToPrintOptionThisWeek();
       await printPreviewPopup.verifyTaskPrintButtonVisible();
       await printPreviewPopup.clickTaskPrintButton();
       await printPreviewPopup.verifyTaskDataLoadingToPrint();

       

       
    })
})



