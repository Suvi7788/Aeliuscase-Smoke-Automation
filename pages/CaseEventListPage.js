const { EventForm } = require("./components/EventForm");
const { expect } = require("@playwright/test");

class CaseEventListPage {
    constructor(page) {
        this.page = page;
        this.eventForm = new EventForm(page);

        const addEventBtn = "//button[@ptooltip='Create Event']";
        this.AddEventBtn = page.locator(addEventBtn);

    }
    async openEventForm() {
        await this.AddEventBtn.click();
    }

    async createCaseEventListEvent(caseNo, Subject, Assignee, Description) {
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }

    async verifyEventCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();
    }
}
module.exports = { CaseEventListPage };
