const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const routes = require('../config/routes');
const endpoints = require('../config/endpoints');

class CaseNoteListPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.AddNoteBtn = this.page.locator('button[ptooltip="New Note"]');
        this.selectPeriodForPrint = this.page.locator("//span[@aria-label='Select Period']");
        this.selectThisWeekForPrint = this.page.locator("//span[@class='ng-star-inserted'][normalize-space()='This Week']");
        this.noteOptions = this.page.locator("//button[@ptooltip='Options']").first();
        this.noteViewBtn = this.page.getByText('View Note', { exact: true }).first();
        this.noteEditBtn = this.page.getByText('Edit Note', { exact: true }).first();
        this.noteDeleteBtn = this.page.locator("//button[@ptooltip='Delete Note']").first();
        this.deleteNoteConfirmButton = this.page.getByRole('button', { name: 'Proceed' });

    }

    async openNoteForm() {
        await this.AddNoteBtn.click();
    }

    async verifyRecordCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async verifyNoteInCaseNoteList(caseId) {
        await this.gotoAndWaitForAPI(routes.caseNoteList(caseId), endpoints.GetCaseNote);
    }

    async selectPeriodForPrint(){
        await this.selectPeriodForPrint.click();
    }

    async selectThisWeekForPrint(){
        await this.selectThisWeekForPrint.click();
    }

    async viewNote(){
        await this.noteOptions.click();
        await this.noteViewBtn.click();
    }


    async navigateToEditNote(){
        await this.noteOptions.click();
        await this.noteEditBtn.click();
    }

    async verifyEditNote(){
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }

    async deleteNote(){
        await this.noteDeleteBtn.click();
        await this.deleteNoteConfirmButton.click();
    }

    async verifyDeleteNote(){
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }
}
module.exports = { CaseNoteListPage };