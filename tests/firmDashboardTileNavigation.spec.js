const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { FirmTaskListPage } = require("../pages/FirmTaskListPage");
const { FirmEventListPage } = require("../pages/FirmEventListPage");
const { FirmMessageListPage } = require("../pages/FirmMessageListPage");
const { CasePage } = require("../pages/CasePage");


test.describe('Firm Dashboard Tile Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Navigate to Task List', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const firmTaskListPage = new FirmTaskListPage(page);
        await firmDashboardPage.navigateToTaskList();
        await firmTaskListPage.verifyTaskListNavigation();
    })
    test('Navigate to Event List', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const firmEventListPage = new FirmEventListPage(page);
        await firmDashboardPage.navigateToEventList();
        await firmEventListPage.verifyEventListNavigation();
    })
    test('Navigate to Message List', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const firmMessageListPage = new FirmMessageListPage(page);
        await firmDashboardPage.navigateToMessageList();
        await firmMessageListPage.verifyMessageListNavigation();
    })
    test('Navigate to Case List', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const casePage = new CasePage(page);
        await firmDashboardPage.navigateToCaseList();
        await casePage.verifyCaseListNavigation();
    })
})