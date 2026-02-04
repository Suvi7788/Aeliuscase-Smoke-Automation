const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');
const { expect } = require("@playwright/test");

class CasePage extends BasePage {
    constructor(page) {
        super(page);
        this.createCaseBtn = page.locator("//button[@ptooltip='Create New Case']");
        this.caseListOption = page.locator('div.mt-1.flex').locator('button').nth(0);
        this.openCaseBtn = page.locator("//span[@ptooltip='Click to open this case in its own window.']").first();
        this.deleteCaseBtn = page.locator("//button[@ptooltip='Click to delete DOI']").first();
        this.confirmDeleteBtn = page.getByRole('button', { name: 'Proceed' });
    }

    async openCaseForm() {
        await this.createCaseBtn.click();
    }

    async verifyCaseList(type) {
        const url = routes.caseList(type);
        await this.gotoAndWaitForAPI(url, endpoints.getCaseList);
    }

    async openCaseListOption(option) {
        await this.caseListOption.click();
        await this.page.getByText(option, { exact: true }).click();
    }

    async verifyCaseCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully created the case' })).toBeVisible();
    }

    async verifyRecordCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async verifyEventCreation() {
        // await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();

    }

    async verifyCaseListNavigation() {
        await expect(this.page).toHaveURL(/\/dashboard\/recent-cases(\?|$)/);
    }

    async navigateToACase() {
        await this.openCaseBtn.click();
    }

    async verifyCaseNavigation() {
        await expect(this.page).toHaveURL(/\/dashboard\/case-overview\/\d+$/);
    }

    async deleteCase() {
        await this.deleteCaseBtn.click();
        await this.confirmDeleteBtn.click();
    }

    async verifyCaseDeletion() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Case Deleted successfully!' })).toBeVisible();
    }
}
module.exports = { CasePage };
