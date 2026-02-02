const { expect } = require('@playwright/test');
const taskData = require("../../data/taskData.json");
class TaskForm {
    constructor(page) {
        this.page = page;
        const subjectFiled = 'input[formcontrolname="subject"]';
        this.Subject = page.locator(subjectFiled);
        const assigneeFiled = "//p-autocomplete[@class='p-element p-inputwrapper ng-untouched ng-pristine ng-invalid']//input[@role='combobox']";
        const descriptionFiled = ".ql-editor";

        this.Subject = page.locator(subjectFiled);
        this.Assignee = page.locator(assigneeFiled);
        this.AssigneeValue = page.getByRole('option', { name: taskData.AssigneeValue });
        this.Description = page.locator(descriptionFiled);
        this.CalculateDays = page.locator('input[formcontrolname="calculateDays"]');
        this.SaveBtn = page.getByRole('button', { name: 'Save', exact: true });
        this.editBtn = page.getByRole('button', { name: 'Edit', exact: true });
        this.TaskSubject = page.locator('p').filter({ hasText: 'Test Automation Task - Description' }).first();
    }

    async fillTaskForm(caseNo, Subject, Assignee, Description) {
        await this.Subject.fill(Subject);
        await this.Assignee.fill(Assignee);
        await this.CalculateDays.fill("5");
        await this.AssigneeValue.click();
        await this.Description.fill(Description);
    }

    async submitTaskForm() {
        await this.SaveBtn.click();
    }

    async navigateToEdit() {
        await this.editBtn.click();
    }

    async editTaskDetails(updatedDetails) {
        await this.Description.fill(updatedDetails);
    }

    async verifyTaskView() {
        await expect(this.TaskSubject).toBeVisible();
    }
} module.exports = { TaskForm };