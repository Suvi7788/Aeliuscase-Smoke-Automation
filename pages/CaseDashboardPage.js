const { expect } = require('@playwright/test');
const { EventForm } = require("./components/EventForm");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');

class CaseDashboardPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.container = this.page.getByText('Case Number: |');
        this.AddEventBtn = this.page.locator('button[ptooltip="Create New Event"]');
        this.eventForm = new EventForm(page);

        this.EventListTab = this.page.getByRole('tab', { name: 'Calendar' });
    }

    //!!!!!NEED TO GET CSS ID TO VERIFY
    async verifyNavigationToCase() {
        await expect(this.container).toContainText('AE00147');

    }

    //Open Event Form From Case Dashboard
    async openEventForm() {
        await this.waitForAPIResponse(endpoints.caseEventList);
        await this.AddEventBtn.click();
    }

    async createCaseDashboardEvent(caseNo, Subject, Assignee, Description) {
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }

    async verifyEventCreation() {
        await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();
        this.page.waitForURL(/case-overview/);

    }

    async navigateToCaseEventList() {
        await this.EventListTab.click();
    }
}
module.exports = { CaseDashboardPage };
