class EventForm {
    constructor(page) {
        const caseFiled = "p-autocomplete[class='p-element p-inputwrapper ng-pristine ng-valid ng-star-inserted ng-untouched'] input[role='combobox']";
        const caseValue = ':text-is("AE00147 - Automation vs DO NOT DELETE")'
        const subjectFiled = "input.p-inputtext.p-component.p-element.ng-pristine.ng-valid.ng-touched";
        const assigneeFiled = "//p-autocomplete[@class='p-element p-inputwrapper ng-untouched ng-pristine ng-invalid']//input[@role='combobox']";
        const assigneeValue = "suvi dison"
        const descriptionFiled = "tdiv.ql-editor.ql-blank";

        this.page = page;
        this.TypeField = page.getByRole('combobox', { name: 'Select Type' });
        this.TypeValue = page.getByRole('option', { name: 'Appt With Attorney' });
        this.CaseNo = page.locator(caseFiled);
        this.CaseValue = page.getByText(caseValue);
        this.Subject = page.locator(subjectFiled);
        this.Assignee = page.locator(assigneeFiled);
        this.AssigneeValue = page.getByText(assigneeValue);
        this.Description = page.locator(descriptionFiled);
        this.SaveBtn = page.getByRole('button', { name: 'Save' });
    }

    async fillEventForm(caseNo, Subject, Assignee, Description) {
        await this.TypeField.click();
        await this.TypeValue.click();
        // await this.CaseNo.fill(caseNo);
        // await this.CaseValue.click();
        await this.Subject.fill(Subject);
        await this.Assignee.fill(Assignee);
        await this.AssigneeValue.click();
        await this.Description.fill(Description);
    }

    async submitEventForm() {
        await this.SaveBtn.click();
    }
}

module.exports = { EventForm };