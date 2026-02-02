const { routes } = require('../../config/routes');
class ListUnassignedPage {
    constructor(page) {
        this.page = page;
        this.uploadDocumentBtn = page.locator('button[ptooltip="Upload Unassigned"]');
        this.fileInput = page.locator('.upload-box input[type="file"]');
    }

    async uploadDocument(filePath) {
        await this.uploadDocumentBtn.click();
        await this.fileInput.setInputFiles(filePath);
    }

    async startUpload() {
        await this.page.getByRole('button', { name: 'Start Upload' }).click();
    }

    async verifyUploadSuccess() {
        await expect(this.page).toHaveURL(routes.listUnassigned);
    }

    async openFirstDocument() {
        await this.page.locator('.thumbnail-img').first().click();
    }
}
module.exports = { ListUnassignedPage };