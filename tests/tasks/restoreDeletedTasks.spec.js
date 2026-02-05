const { test } = require("@playwright/test");
const taskData = require("../../data/taskData.json");
const { Menu } = require("../../pages/Menu");
const { TaskForm } = require("../../pages/components/TaskForm");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const { FirmTaskListPage } = require("../../pages/FirmTaskListPage");
const { FirmDashboardPage } = require("../../pages/FirmDashboardPage");
const { CaseTaskListPage } = require("../../pages/CaseTaskListPage");
const { CasePage } = require("../../pages/CasePage");
const { caseListOptions } = require("../../config/caseListOptions");
const { CaseOverviewPage } = require("../../pages/CaseOverviewPage");
const { CaseActivitySection } = require("../../pages/case/CaseActivitySection");
const { ToastMessages } = require("../../tests/utils/toastMessages");

test.describe('Delete Task', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('Restore Deleted Task From Firm Task List', async ({ page }) => {
        const menu = new Menu(page);
        const firmTaskListPage = new FirmTaskListPage(page);
        await menu.navigate("task", "tasksInbox");
        await firmTaskListPage.navigateToAllTaskList();
        await firmTaskListPage.restoreDeletedTask();
        await firmTaskListPage.verifyRestoreTask();
    })

    test('Restore Deleted Task From Case Task List @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTaskListPage = new CaseTaskListPage(page);
        await menu.searchForCase(taskData.caseNo);
        const caseOverview = new CaseOverviewPage(page);
        await caseOverview.caseTabs.open('tasks');
        await caseTaskListPage.restoreDeletedTask();
        await caseTaskListPage.verifyRestoreTask();
    })

    
})