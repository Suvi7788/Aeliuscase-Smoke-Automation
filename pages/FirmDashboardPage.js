const { EventForm } = require("./components/EventForm");
const { expect } = require('@playwright/test');
const { CaseCreationPage } = require("./CaseCreationPage");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');

class FirmDashboardPage extends BasePage {
    constructor(page) {
        super(page)
        const addEventBtn = "//button[@ptooltip='Create New Event']";
        const createCaseBtn = "//button[@ptooltip='Open a Case']";

        this.page = page;
        this.AddEventBtn = page.locator(addEventBtn);
        this.createCaseBtn = page.locator(createCaseBtn);

        this.eventForm = new EventForm(page);
        this.caseCreationPage = new CaseCreationPage(page);

    }

    async navigateToFirmDashboard() {
        await this.page.goto('https://uat.aeliuscase.com/dashboard');
    }

    async openEventForm() {
        // await this.waitForAPIResponse(endpoints.firmEventTile);
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
        await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();


    }

    async searchForCase(caseNo) {
        await this.page.locator('input.p-autocomplete-input[placeholder="Search"]').fill(caseNo);
        await this.page.getByRole('cell', { name: caseNo, exact: true }).click();
    }

    async openCaseForm() {
        await this.createCaseBtn.click();
    }

}
module.exports = { FirmDashboardPage };
