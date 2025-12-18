const { test } = require("@playwright/test");
const taskData = require("../data/taskData.json");
const { Menu } = require("../pages/Menu");
const { TaskForm } = require("../pages/components/TaskForm");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const { FirmTaskListPage } = require("../pages/FirmTaskListPage");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseTabs } = require("../pages/components/CaseTabs");
const { CaseTaskListPage } = require("../pages/CaseTaskListPage");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");

test.describe('Update Task', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Update Task From Firm Dashboard', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const taskForm = new TaskForm(page);
        await firmDashboardPage.viewAddedTask();
        await taskForm.navigateToEdit();
        await taskForm.editTaskDetails(taskData.EditedDescription);
        await taskForm.submitTaskForm();
        await firmDashboardPage.verifyRecordUpdate();
    })

    test('Update Task From Firm Task List', async ({ page }) => {
        const menu = new Menu(page);
        const firmDashboardPage = new FirmDashboardPage(page);
        const firmTaskListPage = new FirmTaskListPage(page);
        const taskForm = new TaskForm(page);
        await menu.navigateToFirmTaskList();
        await firmDashboardPage.viewAddedTask();
        await taskForm.navigateToEdit();
        await taskForm.editTaskDetails(taskData.EditedDescription);
        await taskForm.submitTaskForm();
        await firmTaskListPage.verifyRecordUpdate();
    })

    test('Update Task From Case Dashboard', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardPage = new CaseDashboardPage(page);
        const taskForm = new TaskForm(page);
        await menu.searchForCase(taskData.caseNo);
        await caseDashboardPage.viewAddedTask();
        await taskForm.navigateToEdit();
        await taskForm.editTaskDetails(taskData.EditedDescription);
        await taskForm.submitTaskForm();
        await caseDashboardPage.verifyRecordUpdate();
    })

    test('Update Task From Case Task List', async ({ page }) => {
        const menu = new Menu(page);
        const caseTaskListPage = new CaseTaskListPage(page);
        const taskForm = new TaskForm(page);
        const caseTabs = new CaseTabs(page);
        await menu.searchForCase(taskData.caseNo);
        await caseTabs.navigateToCaseTaskList();
        await caseTaskListPage.viewAddedTask();
        await taskForm.navigateToEdit();
        await taskForm.editTaskDetails(taskData.EditedDescription);
        await taskForm.submitTaskForm();
        await caseTaskListPage.verifyRecordUpdate();
    })

})