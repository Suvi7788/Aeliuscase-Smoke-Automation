const { EventForm } = require("./components/EventForm");
const { expect } = require("@playwright/test");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class CaseEventListPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.eventForm = new EventForm(page);

        const addEventBtn = "//button[@ptooltip='Create Event']";
        this.AddEventBtn = page.locator(addEventBtn);

    }
    async openEventForm() {
        await this.waitForAPIResponse(endpoints.caseEventList);
        await this.AddEventBtn.click();
    }

    async createCaseEventListEvent(caseNo, Subject, Assignee, Description) {
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }

    async verifyEventCreation() {
        await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();

    }

    async verifyEventInCaseEventList(caseId) {
        await this.gotoAndWaitForAPI(routes.caseEventList(caseId), endpoints.caseEventList);
    }
}
module.exports = { CaseEventListPage };
