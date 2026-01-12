const { expect } = require("@playwright/test");
class DocumentUploadComponent {
    constructor(page) {
        this.page = page;
        this.uploadDocumentBtn = page.locator('button[ptooltip="Upload Unassigned"]');
        this.fileInput = page.locator('input[type="file"]');
        
    }

    async uploadDocument(filePath) {
        // await this.uploadDocumentBtn.click();
        await this.fileInput.setInputFiles(filePath);
    }

    async startUpload() {
        await this.page.getByRole('button', { name: 'Start Upload' }).click();
    }

    async scanDocument() {
        await this.page.getByRole('button', { name: 'Scan', exact: true }).click();
    }

    async verifyUploadNavigation(route) {
        await expect(this.page).toHaveURL(route);
    }

    async verifyScanCompleted() {
        await expect(this.page.getByText('Scanning....Please Wait....')).toBeHidden({ timeout: 60000 });
    }
    async verifyUploadSuccessMessage() {
        await expect(this.page.getByText('Document uploaded successfully.')).toBeVisible();
    }

    async verifyCaseDocsUpload() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'File Uploaded Successfully' }).first()).toBeVisible();
    }

}
module.exports = { DocumentUploadComponent };