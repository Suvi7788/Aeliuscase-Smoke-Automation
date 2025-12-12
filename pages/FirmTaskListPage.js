const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class FirmTaskListPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.AddTaskBtn = page.locator("//button[@ptooltip='Create New Task']");
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
}
module.exports = { FirmTaskListPage };
