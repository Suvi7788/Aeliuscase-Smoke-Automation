const { EventForm } = require("./components/EventForm");
const { expect } = require('@playwright/test');
const { CaseCreationPage } = require("./CaseCreationPage");
const { MessageForm } = require("./components/MessageForm");

class FirmDashboardPage {
    constructor(page) {
        const addEventBtn = "//button[@ptooltip='Create New Event']";
        const createCaseBtn = "//button[@ptooltip='Open a Case']";
        const addMessageBtn = "//button[@ptooltip='Create New Message']";

        this.page = page;
        this.AddEventBtn = page.locator(addEventBtn);
        this.createCaseBtn = page.locator(createCaseBtn);
        this.AddMessageBtn = page.locator(addMessageBtn);
        
        this.eventForm = new EventForm(page);
        this.caseCreationPage = new CaseCreationPage(page);
        this.messageForm = new MessageForm(page);
    }

    async navigateToFirmDashboard() {
        await this.page.goto('https://uat.aeliuscase.com/dashboard');
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
        await this.page.getByRole('cell', { name: caseNo, exact: true }).click();
    }

    async openCaseForm() {
        await this.createCaseBtn.click();
    }

    async openMessageForm(){
        await this.AddMessageBtn.click();
    }

    async createFirmDashboardMessage(caseNo, user, Details){
        await this.openMessageForm();
        await this.messageForm.fillMessageForm(caseNo, user, Details);
        await this.messageForm.submitMessageForm();
    }

}
module.exports = { FirmDashboardPage };
