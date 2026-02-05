const { expect } = require('@playwright/test');
const { EventForm } = require("../components/EventForm");
const { BasePage } = require('../BasePage');
const endpoints = require('../../config/endpoints');
const routes = require('../../config/routes');
const { CaseTabs } = require('./CaseTabs');


class CaseDashboardSection extends BasePage {
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
        this.editPartyButton = page.getByText('Edit', { exact: true });
        this.addPartyButton = page.locator('button[ptooltip="Add a new party"]');
        this.deleteConfermationMsg = this.page.locator("//span[normalize-space()='Proceed']").first();
        this.taskDeleteBtn = page.locator("//button[@ptooltip='Delete Task']").first();
        this.taskSectionTitle = page.getByText('Case Tasks (');
        this.eventSectionTitle = page.getByText('Upcoming Events (');
        this.noteSectionTitle = page.getByText('Notes (');
        this.deleteEventBtn = page.locator("//button[@ptooltip='Delete Event']").first();
        this.deleteConfirmationMsg = this.page.locator("//span[normalize-space()='Proceed']").first();
        this.eventOptions = page.locator("//button[@ptooltip='Options']").first();
        this.viewEventBtn = page.getByText('View Event', { exact: true }).first();
        this.editEventBtn = page.getByText('Edit Event', { exact: true }).first();
        this.eventSubject = page.getByText('Subject', { exact: true });
        this.noteOptions = this.page.locator("//button[@ptooltip='Options']").first();
        this.noteViewBtn = this.page.getByText('View Note', { exact: true }).first();
        this.noteEditBtn = this.page.getByText('Edit Note', { exact: true }).first();
        this.noteDeleteBtn = this.page.locator("//button[@ptooltip='Delete Note']").first();
        this.deleteNoteConfirmButton = this.page.getByRole('button', { name: 'Proceed' });
        this.caseTabs = new CaseTabs(page);
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
    async openCreatedParty(partyType) {
        this.partyType = partyType;
        await this.page.getByText(partyType).first().click();
    }
    async navigateToEditParty() {
        await this.editPartyButton.click();
    }
    async verifyPartyUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${this.partyType} party was successfully update` })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }

    async verifyEmployerApplicantUpdate(party) {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${party} successfully update` })).toBeVisible();
    }

    async deleteTask() {
        await expect(this.taskDeleteBtn)
            .toBeVisible();
        await this.taskDeleteBtn.click();
        await this.deleteConfermationMsg.click();
    }

    async verifyDeleteTask() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
    }


    async navigateToTaskList() {
        await this.taskSectionTitle.click();
    }

    async navigateToEventList() {
        await this.eventSectionTitle.click();
    }
    async navigateToNoteList() {
        await this.noteSectionTitle.click();
    }

    async deleteEvent() {
        await expect(this.deleteEventBtn)
            .toBeVisible();
        await this.deleteEventBtn.click();
        await this.deleteConfirmationMsg.click();
    }

    async verifyDeleteEvent() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
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

    async viewNote() {
        await this.noteOptions.click();
        await this.noteViewBtn.click();
    }


    async navigateToEditNote() {
        await this.noteOptions.click();
        await this.noteEditBtn.click();
    }

    async verifyEditNote() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }

    async deleteNote() {
        await this.noteDeleteBtn.click();
        await this.deleteNoteConfirmButton.click();
    }

    async verifyDeleteNote() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }

    async verifyNoteView() {
        await expect(this.noteSubject).toBeVisible();
    }

    async editNote(updatedDescription) {
        await this.Description.fill(updatedDescription + Date.now());
    }
}
module.exports = { CaseDashboardSection };
