const { expect } = require("@playwright/test");
export class DeleteDocumentComponent {
    constructor(page) {
        this.page = page;
        this.deleteBtn = page.locator('button[ptooltip="Delete"]').first();
        this.deleteConfirmBtn = page.getByRole('button', { name: 'Proceed' })
        this.deleteLetterTemplateBtn = page.locator('button:has(.pi-trash):not([disabled])').first();
    }

    async deleteDocument() {
        await this.deleteBtn.click();
        await this.deleteConfirmBtn.click();
    }

    async deleteLetterTemplate() {
        await this.deleteLetterTemplateBtn.click();
        await this.deleteConfirmBtn.click();
    }

    async verifyBatchScanDeleteSuccess() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Batch scan deleted successfully' })).toBeVisible();
    }

    async verifyDocumentDeleteSuccess() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'deleted successfully' })).toBeVisible();
    }
}