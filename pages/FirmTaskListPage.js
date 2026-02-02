const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class FirmTaskListPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.AddTaskBtn = page.locator("//button[@ptooltip='Create New Task']");
        this.taskSubject = page.getByText('Test Automation Task - Subject').first();
        this.DeletedTasks=page.getByRole('button', { name: 'Deleted Task' }).first();
        this.restoreDeletedTask=page.locator("//button[@ptooltip='Restore Task']").first();
        this.confirmRestoreTask=page.getByRole('button', { name: 'Proceed' }).first();
    }

    async openTaskForm() {
        await this.AddTaskBtn.click();
    }

    //Verify Task Creation
    async verifyTaskCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async verifyTaskInTaskList() {
        await this.gotoAndWaitForAPI(routes.taskList, endpoints.GetTaskList);
    }

    async viewAddedTask() {
        await this.taskSubject.click();
    }

    async verifyRecordUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }

    async verifyTaskListNavigation() {
    await expect(this.page).toHaveURL(/\/dashboard\/list-task\//);
    }

    async restoreDeletedTask() {
        await this.DeletedTasks.click();
        await this.restoreDeletedTask.click();
        await this.confirmRestoreTask.click();
    }


}
module.exports = { FirmTaskListPage };
