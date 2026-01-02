const { expect } = require("@playwright/test");
export class DeleteDocumentComponent {
    constructor(page) {
        this.page = page;
        this.deleteBtn = page.locator('button[ptooltip="Delete"]').first();
        this.deleteConfirmBtn = page.getByRole('button', { name: 'Proceed' })
    }

    async deleteDocument() {
        await this.deleteBtn.click();
        await this.deleteConfirmBtn.click();
    }

    async verifyBatchScanDeleteSuccess() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Batch scan deleted successfully' })).toBeVisible();
    }

    async verifyDocumentDeleteSuccess() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'deleted successfully' })).toBeVisible();
    }
}