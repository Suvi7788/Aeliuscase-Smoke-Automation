const { expect } = require('@playwright/test');

class DocumentActionsPage {
    constructor(page) {
        this.page = page;

        this.unselectedRow = page.locator('.p-checkbox-box.p-component').first();
        // Bulk action dropdown (appears after selection)
        this.bulkActionDropdown = page.getByRole('combobox', { name: 'Select an Action' });

        // Toast message
        this.toastMessage = page.locator('.p-toast-detail');
        this.deleteConfirmBtn = page.getByRole('button', { name: 'Proceed' });

        this.caseField = page.locator('.p-element.p-inputwrapper.full-width > .p-autocomplete > .p-element.p-autocomplete-input');
        this.caseValue = page.locator(':text-is("AE00147 Automation vs DO NOT DELETE")')
        this.saveBtn = page.locator('button[ptooltip="Apply"]').first();
        this.taskDocumentTable = page.locator('tr.ng-star-inserted').locator('td').nth(0);
    }

    async selectFirstNRows() {
        await this.unselectedRow.click();
    }

    async verifyBulkActionsVisible() {
        await expect(this.bulkActionDropdown).toBeVisible();
    }

    async selectBulkAction(actionName) {
        await this.bulkActionDropdown.click();
        await this.page.getByRole('option', { name: actionName }).click();
    }

    async confirmDeleteDocument() {
        await this.deleteConfirmBtn.click();
    }

    async verifyToastContains(text) {
        await expect(this.toastMessage).toContainText(text);
    }

    async assignDocumentToCase(caseNo) {
        await this.caseField.fill(caseNo);
        await this.caseValue.click();
    }

    async saveDocument() {
        await this.saveBtn.click();
    }

    async verifyDocumentAttachedToTask() {
        await expect(this.taskDocumentTable).toBeVisible();
    }
}

module.exports = { DocumentActionsPage };
