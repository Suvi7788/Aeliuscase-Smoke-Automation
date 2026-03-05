const { expect } = require("@playwright/test");
import path from 'path';

class DocumentUploadComponent {
    constructor(page) {
        this.page = page;
        this.uploadDocumentBtn = page.locator('button[ptooltip="Upload Unassigned"]');
        this.uploadNewLetterTemplates = page.locator("//button[@ptooltip='Upload new letter templates']");
        this.fileInput = page.locator('input[type="file"]');
    }

    async uploadDocument(filePath) {
        // await this.uploadDocumentBtn.click();
        await this.fileInput.setInputFiles(filePath);
    }

    async addLetterTemplate() {
        await this.uploadNewLetterTemplates.click();
    }

    async startUpload() {
        await this.page.getByRole('button', { name: 'Start Upload' }).click();
    }

    async scanDocument() {
        await this.page.getByRole('button', { name: 'Scan', exact: true }).click();
    }

    async confirmUpload() {
        await this.page.getByRole('button', { name: 'Confirm All' }).click();
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



    //letters
    async uploadLetterTemplate(filePath) {

        const [chooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.getByRole('button', { name: 'Add More' }).click(),
        ]);

        await chooser.setFiles(filePath);
        await this.page.getByRole('button', { name: 'Start Upload' }).click();

    }
}
module.exports = { DocumentUploadComponent };