const { expect } = require('@playwright/test');
const { EventForm } = require("./components/EventForm");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class CaseDashboardPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.container = this.page.getByText('Case Number: |');
        this.AddEventBtn = this.page.locator('button[ptooltip="Create New Event"]');
        this.AddTaskBtn = this.page.locator('button[ptooltip="Create New Task"]');
        this.AddNoteBtn = this.page.locator('button[ptooltip="New Note"]');
        this.AddQuickNoteBtn = this.page.locator('span.p-button-icon.pi.pi-plus-circle');
        this.AddApplicantPartyNoteBtn = this.page.locator('button.p-element.p-ripple.footer-label.p-button-rounded.p-button-success.p-button-text.px-0.p-button.p-component');
        this.eventForm = new EventForm(page);
        this.taskSubject = page.getByText('Test Automation Task - Subject').first();
        this.caseNumber = this.page.locator(':text-is("Case Number: AE00147 |")');
    }

    //!!!!!NEED TO GET CSS ID TO VERIFY
    async verifyNavigationToCase() {
        // await expect(this.caseNumber).toBeVisible();
        await expect(this.page).toHaveURL(/\/dashboard\/case-overview\//);

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


    async verifyTilesLoadsInCaseDashboard(caseId, apiUrl) {
        await this.gotoAndWaitForAPI(routes.caseDashboard(caseId), apiUrl);
    }

    //Open Task Form From Case Dashboard
    async openTaskForm() {
        // await this.waitForAPIResponse(endpoints.getCaseDashboardTaskList);
        await this.AddTaskBtn.click();
    }

    //Verify Task/Note Creation
    async verifyRecordCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async openNoteForm() {
        await this.AddNoteBtn.click();
    }

    async openQuickNoteForm() {
        await this.AddQuickNoteBtn.click();
    }

    async openPartyNoteForm() {
        await this.AddApplicantPartyNoteBtn.click();
    }

    async viewAddedTask() {
        await this.taskSubject.click();
    }

    async verifyRecordUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }
}
module.exports = { CaseDashboardPage };
