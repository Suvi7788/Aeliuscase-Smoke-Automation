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
        if (!await this.taskDeleteBtn.isVisible({ timeout: 100000 })) {
            throw new Error('Pre-condition failed: Test task not found');
        }
        await this.taskDeleteBtn.click();
        await this.deleteConfermationMsg.click();
    }

    async verifyDeleteTask() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
    }
}
module.exports = { CaseTaskListPage };
