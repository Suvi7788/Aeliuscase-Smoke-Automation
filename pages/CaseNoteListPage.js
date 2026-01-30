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
}
module.exports = { CaseNoteListPage };