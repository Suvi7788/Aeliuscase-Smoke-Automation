const { expect } = require("@playwright/test");

class CaseDocsSection {
    constructor(page) {
        this.page = page;
        this.addDocsBtn = this.page.locator('button[ptooltip="Add Documents"]');
        this.unselectedRow = page.locator('.p-checkbox-box.p-component');
        this.mergeDocumentsBtn = page.getByText('Merge Documents', { exact: true });
        this.mergeBtn = page.getByText('Merge', { exact: true });
        this.downloadAsZipBtn = page.getByText('Download as Zip', { exact: true });
        this.downloadBtn = page.getByRole('button', { name: 'Download as ZIP' });
        this.docType = page.locator('span').filter({ hasText: 'Select Type' }).first();
    }

    async openAddDocsForm() {
        await this.addDocsBtn.click();
    }

    async openFirstDocument() {
        await this.page.locator('.thumbnail-img').first().click();
    }

    async selectDocuments() {
        await this.unselectedRow.nth(0).click();
        await this.unselectedRow.nth(1).click();
    }

    async mergeDocuments() {
        await this.mergeDocumentsBtn.click();
        await this.mergeBtn.click();
    }

    async downloadDocumentsAsZip() {
        await this.downloadAsZipBtn.click();
        await this.downloadBtn.nth(1).click();

    }

    async verifyMergeDocumentSuccess() {
        await expect(this.page.locator('.p-toast-detail')).toContainText('Successfully merged documents');
    }

    async verifyDownloadDocumentSuccess() {
        await expect(this.page.locator('.p-toast-detail')).toContainText('The ZIP file is successfully downloaded');
    }

    async selectDocType(docType) {
        await this.docType.click();
        await this.page.getByText(docType, { exact: true }).click();
    }

    async saveAllDocs() {
        await this.page.getByRole('button', { name: 'Save All' }).click();
    }

    async verifySaveAllDocsSuccess() {
        await expect(this.page.locator('.p-toast-detail')).toContainText('Document changes saved successfully');
    }
}
module.exports = { CaseDocsSection };