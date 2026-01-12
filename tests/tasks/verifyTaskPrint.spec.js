const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../../pages/FirmDashboardPage');
const { PrintPreviewPopup } = require('../../pages/components/PrintPreviewPopup');
const { Menu } = require('../../pages/Menu');
const { FirmTaskListPage } = require('../../pages/FirmTaskListPage');

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

test.describe('Task List Print', () => {
    test('Verify Task List Print', async ({ page }) => {
       const menu = new Menu(page);
       await menu.navigate("task", "tasksInbox");
       const firmTaskListPage = new FirmTaskListPage(page);
       const printPreviewPopup = new PrintPreviewPopup(page);
       await firmTaskListPage.navigateToAllTaskList();
       await firmTaskListPage.navigateToPrintOptionDropdown();
       await firmTaskListPage.navigateToPrintOptionThisWeek();
       await printPreviewPopup.verifyTaskPrintButtonVisible();
       await printPreviewPopup.clickTaskPrintButton();
       await printPreviewPopup.verifyTaskDataLoadingToPrint();

    })
})
