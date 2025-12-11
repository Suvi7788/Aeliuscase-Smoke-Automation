const { EventForm } = require("./components/EventForm");
const { expect } = require('@playwright/test');
const { CaseCreationPage } = require("./CaseCreationPage");
const { MessageForm } = require("./components/MessageForm");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class FirmDashboardPage extends BasePage {
    constructor(page) {
        super(page)
        const addEventBtn = "//button[@ptooltip='Create New Event']";
        const createCaseBtn = "//button[@ptooltip='Open a Case']";
        const addMessageBtn = "//button[@ptooltip='Create New Message']";
        const messageButton = "//tr[td[contains(., 'Normal') or contains(., 'High') or contains(., 'Low')]]//td[2]//button";


        this.page = page;
        this.AddEventBtn = page.locator(addEventBtn);
        this.createCaseBtn = page.locator(createCaseBtn);
        this.AddMessageBtn = page.locator(addMessageBtn);
        this.messageButton = this.page.locator(messageButton).first();

        this.eventForm = new EventForm(page);
        this.caseCreationPage = new CaseCreationPage(page);
        this.messageForm = new MessageForm(page);

        
        

        //  event list verification selectors
        this.eventRow = page.locator('td').filter({ hasText: /Normal|High|Low/ }).first();

        //  event list verification selectors
        this.eventRow = page.locator('td').filter({ hasText: /Normal|High|Low/ }).first();

    }

    async navigateToFirmDashboard() {
        await this.page.goto('https://uat.aeliuscase.com/dashboard');
    }

    async openEventForm() {
        await this.AddEventBtn.click();
    }

    async createFirmDashboardEvent(caseNo, Subject, Assignee, Description, daysFromNow = 1) {
        // await this.page.waitForSelector(this.AddEventBtn);
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description, daysFromNow);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }


    

    async verifyEventCreation() {
        // await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();


    }

    async searchForCase(caseNo) {
        await this.page.locator('input.p-autocomplete-input[placeholder="Search"]').fill(caseNo);
        await this.page.getByRole('cell', { name: caseNo, exact: true }).click();
    }

    async openCaseForm() {
        await this.createCaseBtn.click();
    }

    //Open Message Form
    async openMessageForm() {
        await this.AddMessageBtn.click();
    }

    //Create Firm Dashboard Message
    async createFirmDashboardMessage(caseNo, user, Details) {
        await this.openMessageForm();
        await this.messageForm.fillMessageForm(caseNo, user, Details);
        await this.messageForm.submitMessageForm();
    }

    //Verify Message Creation
    async verifyMessageCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async verifyEventInTileList() {
        await this.gotoAndWaitForAPI(routes.dashboard, endpoints.firmEventTile);
    }

    async verifyCaseInTileList() {
        await this.gotoAndWaitForAPI(routes.dashboard, endpoints.dashboardRecentCaseList);
    }

    async verifyMessageListLoads() {
        // Wait for message to appear in tile
        await this.page.waitForTimeout(2000); // Allow time for refresh

        

        // Look for the message details in the tile
        // Adjust selector based on your actual HTML structure
        await expect(this.messageButton).toBeVisible();

        console.log('✓ Message list loaded successfully in Message tile');
    }

}
module.exports = { FirmDashboardPage };
