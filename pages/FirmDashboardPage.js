const { EventForm } = require("./components/EventForm");
const { expect } = require('@playwright/test');

class FirmDashboardPage {
    constructor(page) {
        const addEventBtn = "//button[@ptooltip='Create New Event']";

        this.page = page;
        this.AddEventBtn = page.locator(addEventBtn);

        this.eventForm = new EventForm(page);
    }

    async openEventForm() {
        await this.AddEventBtn.click();
    }

    async createFirmDashboardEvent(caseNo, Subject, Assignee, Description) {
        // await this.page.waitForSelector(this.AddEventBtn);
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }

    async verifyEventCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();
    }

    async searchForCase(caseNo) {
        await this.page.locator('input.p-autocomplete-input[placeholder="Search"]').fill(caseNo);
        await this.page.getByText(caseNo).click();
    }



}
module.exports = { FirmDashboardPage };
