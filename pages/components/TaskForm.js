class TaskForm {
    constructor(page) {
        this.page = page;
        const subjectFiled = 'input[formcontrolname="subject"]';
        this.Subject = page.locator(subjectFiled);
        const assigneeFiled = "//p-autocomplete[@class='p-element p-inputwrapper ng-untouched ng-pristine ng-invalid']//input[@role='combobox']";
        const descriptionFiled = ".ql-editor";

        this.Subject = page.locator(subjectFiled);
        this.Assignee = page.locator(assigneeFiled);
        this.AssigneeValue = page.getByRole('option', { name: 'suvi dison' });
        this.Description = page.locator(descriptionFiled);
        this.CalculateDays = page.locator('input[formcontrolname="calculateDays"]');
        this.SaveBtn = page.getByRole('button', { name: 'Save' });
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
} module.exports = { TaskForm };