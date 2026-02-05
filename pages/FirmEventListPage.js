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
        this.deleteEventBtn = page.locator("//button[@ptooltip='Delete Event']").first();
        this.deleteConfirmationMsg = this.page.locator("//span[normalize-space()='Proceed']").first();
        this.eventOptions = page.locator("//button[@ptooltip='Options']").first();
        this.viewEventBtn = page.getByText('View Event', { exact: true }).first();
        this.editEventBtn = page.getByText('Edit Event', { exact: true }).first();
        this.eventSubject = page.getByText('Subject', { exact: true });
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
    async deleteEvent() {
        await expect(this.deleteEventBtn)
            .toBeVisible();
        await this.deleteEventBtn.click();
        await this.deleteConfirmationMsg.click();
    }

    async verifyDeleteEvent() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' }).first()).toBeVisible();
    }

    async viewEvent() {
        await this.eventOptions.click();
        await this.viewEventBtn.click();
    }

    async verifyEventView() {
        await expect(this.eventSubject).toBeVisible();
    }

    async editEvent() {
        await this.eventOptions.click();
        await this.editEventBtn.click();
    }
    async verifyEventUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event updated successfully.' })).toBeVisible();
    }
}
module.exports = { FirmEventListPage };
