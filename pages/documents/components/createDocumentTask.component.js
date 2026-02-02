import { expect } from "@playwright/test";

export class CreateDocumentTaskComponent {
    constructor(page) {
        this.page = page;
        this.createDocumentTaskBtn = page.locator('button').filter({ hasText: 'Create Task' }).first();
        this.taskDocumentTable = page.locator('tr.ng-star-inserted').locator('td').nth(0);

    }

    async createDocumentTask() {
        await this.createDocumentTaskBtn.click();

    }

    async verifyDocumentAttachedToTask() {
        await expect(this.taskDocumentTable).toBeVisible();
    }

    async verifyTaskCreation() {
        // await this.waitForAPIResponse(endpoints.createTask);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

}