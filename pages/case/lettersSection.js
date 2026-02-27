const { expect } = require("@playwright/test");

class LettersSection {
    constructor(page) {
        this.page = page;
        this.options = page.locator('button[ptooltip="Options"]').first();
        this.composeLetter = this.page.getByRole('menuitem', { name: 'Compose a new letter' });
        this.doiSelect = this.page.getByRole('option', { name: '02/01/2026' });
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        this.successMsg = this.page.locator('div.p-toast-detail', { hasText: 'Letter Saved Successfully' });
        this.viewLetterTemplate = this.page.getByRole('menuitem', { name: 'View the Letter Template' });
        this.viewLetterTemplateVerify = this.page.getByRole('button', { name: 'Word' });
        this.downloadLetter = this.page.getByRole('menuitem', { name: 'Download the Letter' })
        this.downloadLetterVerify = this.page.getByText('is downloaded successfully');
        this.clickDownloadComposedLetter = page.locator('button:has(.pi-download)').first();
        this.deleteComposeLetterClick = this.page.locator('button[ptooltip="Click to delete letter"]').first();
        this.deleteConfermYes = page.locator('.p-confirm-dialog-accept')


    }
    async clickOptions() {
        await this.options.click();
    }
    async openComposeLetter() {
        await this.composeLetter.click();
    }
    async selectDOI() {
        await this.doiSelect.click();
    }
    async save() {
        await this.saveBtn.click();
    }
    async verifySuccessMsg() {
        await expect(this.successMsg).toBeVisible();
    }
    async openViewLetterTemplate() {
        await this.viewLetterTemplate.click();
    }
    async verifyViewLetterTemplate() {
        await expect(this.viewLetterTemplateVerify).toBeVisible();
    }

    async verifyDownloadLetterTemplate() {
        await expect(this.downloadLetterVerify).toBeVisible();
    }

    async downloadLetterTemplate() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            await this.downloadLetter.click()
        ]);

        expect(download).toBeTruthy();
    }
    async downloadComposedLetter() {
        await this.clickDownloadComposedLetter.click();
    }
    async verifyDownload() {
        expect(download).toBeTruthy();
    }
    async deleteComposeLetter(){
        await this.deleteComposeLetterClick.click();
    }
    async deleteConferm(){
        await this.deleteConfermYes.click();
    }
}
module.exports = { LettersSection };