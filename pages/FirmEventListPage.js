const { EventForm } = require("./components/EventForm");
const { expect } = require("@playwright/test");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class FirmEventListPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.eventForm = new EventForm(page);

        const addEventBtn = "//button[@ptooltip='Create Event']";
        this.AddEventBtn = page.locator(addEventBtn);

    }
    async openEventForm() {
        // await this.waitForAPIResponse(endpoints.firmEventList);
        await this.AddEventBtn.click();
    }

    async createFirmEventListEvent(caseNo, Subject, Assignee, Description) {
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }

    async verifyEventCreation() {
        // await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' }).first()).toBeVisible();

    }

    async verifyEventInEventList() {
        await this.gotoAndWaitForAPI(routes.eventList, endpoints.firmEventList);
    }

    async verifyEventListNavigation() {
        await expect(this.page).toHaveURL(/\/dashboard\/list-event\//);
    }
}
module.exports = { FirmEventListPage };
