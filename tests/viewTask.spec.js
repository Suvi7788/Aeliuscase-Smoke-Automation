const { test } = require("@playwright/test");
const taskData = require("../data/taskData.json");
const { Menu } = require("../pages/Menu");
const { TaskForm } = require("../pages/components/TaskForm");
const { CaseDashboardSection } = require("../pages/case/CaseDashboardSection");
const { FirmTaskListPage } = require("../pages/FirmTaskListPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseTaskListPage } = require("../pages/CaseTaskListPage");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");
const { CaseOverviewPage } = require("../pages/CaseOverviewPage");

test.describe('View Task', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('View Task From Firm Dashboard', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const taskForm = new TaskForm(page);
        await firmDashboardPage.viewAddedTask();
        await taskForm.verifyTaskView();
    })

    test('View Task From Firm Task List', async ({ page }) => {
        const menu = new Menu(page);
        const firmTaskListPage = new FirmTaskListPage(page);
        const taskForm = new TaskForm(page);
        await menu.navigate("task","tasksInbox");
        await firmTaskListPage.viewAddedTask();
        await taskForm.verifyTaskView();
    })

    test('View Task From Case Dashboard', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const taskForm = new TaskForm(page);
        await menu.searchForCase(taskData.caseNo);
        await caseDashboardSection.viewAddedTask();
        await taskForm.verifyTaskView();
    })

    test('View Task From Case Task List', async ({ page }) => {
        const menu = new Menu(page);
        const caseTaskListPage = new CaseTaskListPage(page);
        const taskForm = new TaskForm(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(taskData.caseNo);
        await caseOverview.caseTabs.open('tasks');
        await caseTaskListPage.viewAddedTask();
        await taskForm.verifyTaskView();
    })

})