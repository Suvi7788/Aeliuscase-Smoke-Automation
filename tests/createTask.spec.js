const { test } = require("@playwright/test");
const taskData = require("../data/taskData.json");
const { Menu } = require("../pages/Menu");
const { TaskForm } = require("../pages/components/TaskForm");
const { CaseDashboardSection } = require("../pages/sections/CaseDashboardSection");
const { FirmTaskListPage } = require("../pages/FirmTaskListPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseTaskListPage } = require("../pages/CaseTaskListPage");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");
const { CaseOverviewPage } = require("../pages/CaseOverviewPage");


test.describe('Create Task From Firm Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Create Task From Firm Dashboard', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const taskForm = new TaskForm(page);
        await firmDashboardPage.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await firmDashboardPage.verifyMessageAndTaskCreation();
    })

    test('Create Task From Firm Task List', async ({ page }) => {
        const menu = new Menu(page);
        const firmTaskListPage = new FirmTaskListPage(page);
        const taskForm = new TaskForm(page);
        await menu.navigate("task", "tasksInbox");
        await firmTaskListPage.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await firmTaskListPage.verifyTaskCreation();
    })

    test('Create Task From Case Dashboard', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const taskForm = new TaskForm(page);
        await menu.searchForCase(taskData.caseNo);
        await caseDashboardSection.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Create Task From Case Task List', async ({ page }) => {
        const menu = new Menu(page);
        const caseTaskListPage = new CaseTaskListPage(page);
        const taskForm = new TaskForm(page);
        await menu.searchForCase(taskData.caseNo);
        const caseOverview = new CaseOverviewPage(page);
        await caseOverview.caseTabs.open('tasks');
        await caseTaskListPage.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await caseTaskListPage.verifyTaskCreation();
    })

    test('Create Task From Case List', async ({ page }) => {
        const taskForm = new TaskForm(page);
        const casePage = new CasePage(page);
        const menu = new Menu(page);
        await menu.navigate("case", "recentCases");
        await casePage.openCaseListOption(caseListOptions.addTask);
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await casePage.verifyRecordCreation();
    })

})