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
        this.printOptionDropdown = page.getByRole('combobox', { name: 'Option' });
        this.taskPrintOptionDropdown = page.getByRole('combobox', { name: 'Choose Action' });
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

    async navigateToAllTaskList(){
        await this.page.getByText('All', { exact: true }).click();
    }

    async navigateToPrintOptionDropdown(){
        await this.printOptionDropdown.click();
    }

    async navigateToPrintOptionThisWeek(){
        await this.page.getByText('This Week', { exact: true }).click();
    }

    async navigateToTaskPrintOptionDropdown(){
        await this.taskPrintOptionDropdown.click();
    }

}
module.exports = { FirmTaskListPage };
