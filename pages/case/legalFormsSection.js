const { expect } = require("@playwright/test");

class LegalFormsSection {
    constructor(page) {
        this.page = page;
        this.createCourtFormButton = page.locator('button[ptooltip="Create Court Form"]').nth(1);
        this.mergeButton = page.locator('button[ptooltip="Merge"]');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.optionBtn = page.locator('button[ptooltip="Options"]').first();
        this.viewBtn = page.getByRole('menuitem', { name: 'View' });
        this.viewLegalFormVerify = page.locator('button[ptooltip="Click to download document"]');
    }

    async addLegalForm() {
        await this.createCourtFormButton.click();
    }
    async mergeLegalForm() {
        await this.mergeButton.click();
    }
    async saveLegalForm() {
        await this.saveButton.click();
    }
    async option() {
        await this.optionBtn.click();
    }
    async view() {
        await this.viewBtn.click();
    }
    async viewVerifyLegalForm() {
        await expect(this.viewLegalFormVerify).toBeVisible();
    }
}
module.exports = { LegalFormsSection };
