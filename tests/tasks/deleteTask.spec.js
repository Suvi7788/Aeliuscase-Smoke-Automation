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

test.describe('Delete Task', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Delete Task From Firm Dashboard', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.deleteTask();
        await firmDashboardPage.verifyDeleteTask();
    })

    test('Delete Task From Firm Task List', async ({ page }) => {
        const menu = new Menu(page);
        const firmTaskListPage = new FirmTaskListPage(page);
        await menu.navigate("task", "tasksInbox");
        await firmTaskListPage.navigateToAllTaskList();
        await firmTaskListPage.deleteTask();
        await firmTaskListPage.verifyDeleteTask();
    })

    test('Delete Task From Case Dashboard @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        await menu.searchForCase(taskData.caseNo);
        await caseDashboardSection.deleteTask();
        await caseDashboardSection.verifyDeleteTask();
    })

    test('Create Task From Case Task List', async ({ page }) => {
        const menu = new Menu(page);
        const caseTaskListPage = new CaseTaskListPage(page);
        await menu.searchForCase(taskData.caseNo);
        const caseOverview = new CaseOverviewPage(page);
        await caseOverview.caseTabs.open('tasks');
        await caseTaskListPage.deleteTask();
        await caseTaskListPage.verifyDeleteTask();
    })

})