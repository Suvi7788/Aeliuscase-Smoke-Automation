const { TaskForm } = require("./components/TaskForm");
const { expect } = require("@playwright/test");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class CaseTaskListPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.taskForm = new TaskForm(page);

        const addTaskBtn = "//button[@ptooltip='Create New Task']";
        this.AddTaskBtn = page.locator(addTaskBtn);
        this.taskSubject = page.getByText('Test Automation Task - Subject').first();
        this.deleteConfermationMsg = this.page.locator("//span[normalize-space()='Proceed']").first();
        this.taskDeleteBtn = page.locator("//button[@ptooltip='Delete Task']").first();
        this.DeletedTasks = page.getByRole('button', { name: 'Deleted Task' }).first();
        this.restoreDeletedTaskBtn = page.locator("//button[@ptooltip='Restore Task']").first();
        this.confirmRestoreTask = page.getByRole('button', { name: 'Proceed' }).first();
        this.deleteEventBtn = page.locator("//button[@ptooltip='Delete Event']").first();
        this.deleteConfirmationMsg = this.page.locator("//span[normalize-space()='Proceed']").first();

    }
    async openTaskForm() {
        await this.waitForAPIResponse(endpoints.getCaseTaskList);
        await this.AddTaskBtn.click();
    }

    async verifyTaskCreation() {
        // await this.waitForAPIResponse(endpoints.createTask);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async verifyTaskInTaskList(caseId) {
        await this.gotoAndWaitForAPI(routes.caseTaskList(caseId), endpoints.GetTaskList);
    }

    async viewAddedTask() {
        await this.taskSubject.click();
    }

    async verifyRecordUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }

    async deleteTask() {
        // if (!await this.taskDeleteBtn.isVisible({ timeout: 100000 })) {
        // throw new Error('Pre-condition failed: Test task not found');
        // }
        await this.taskDeleteBtn.click();
        await this.deleteConfermationMsg.click();
    }

    async verifyDeleteTask() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
    }

    async restoreDeletedTask() {
        await this.DeletedTasks.click();
        await expect(this.restoreDeletedTaskBtn)
            .toBeVisible();

        await this.restoreDeletedTaskBtn.click();
        await this.confirmRestoreTask.click();
    }

    async verifyRestoreTask() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully Restore the task' })).toBeVisible();
    }

    async verifyTaskListNavigation() {
        await expect(this.page).toHaveURL(/\/dashboard\/list-task\//);
    }
    async deleteEvent() {
        await expect(this.deleteEventBtn)
            .toBeVisible();
        await this.deleteEventBtn.click();
        await this.deleteConfirmationMsg.click();
    }

    async verifyDeleteEvent() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
    }
}
module.exports = { CaseTaskListPage };
