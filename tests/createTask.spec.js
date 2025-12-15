const { test } = require("@playwright/test");
const taskData = require("../data/taskData.json");
const { Menu } = require("../pages/Menu");
const { TaskForm } = require("../pages/components/TaskForm");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const { FirmTaskListPage } = require("../pages/FirmTaskListPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseTabs } = require("../pages/components/CaseTabs");
const {CaseTaskListPage} = require("../pages/CaseTaskListPage");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");

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
        await menu.navigateToFirmTaskList();
        await firmTaskListPage.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await firmTaskListPage.verifyTaskCreation();
    })

    test('Create Task From Case Dashboard', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardPage = new CaseDashboardPage(page);
        const taskForm = new TaskForm(page);
        await menu.searchForCase(taskData.caseNo);
        await caseDashboardPage.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await caseDashboardPage.verifyRecordCreation();
    })

    test('Create Task From Case Task List', async ({ page }) => {
        const menu = new Menu(page);
        const caseTaskListPage = new CaseTaskListPage(page);
        const taskForm = new TaskForm(page);
        const caseTabs = new CaseTabs(page);
        await menu.searchForCase(taskData.caseNo);
        await caseTabs.navigateToCaseTaskList();
        await caseTaskListPage.openTaskForm();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await caseTaskListPage.verifyTaskCreation();
    })

    test('Create Task From Case List', async ({ page }) => {
        const taskForm = new TaskForm(page);
        const casePage = new CasePage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.addTask);
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await casePage.verifyRecordCreation();
    })

})