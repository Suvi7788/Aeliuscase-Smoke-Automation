const { expect } = require("@playwright/test");
class EmailSettingsSection {
    constructor(page) {
        this.page = page;
        this.addEmailAccountButton = page.getByRole('button', { name: 'Add Email Account' })
        this.emailAccountDropdown = page.getByRole('combobox', { name: '-- Select email account --' })
        this.emailInput = page.locator('input[formcontrolname="email"]')
        this.saveButton = page.getByRole('button', { name: 'Save' })

    }

    async openAddEmailForm() {
        await this.addEmailAccountButton.click();
    }

    async selectEmailType(emailType) {
        await this.emailAccountDropdown.click();
        await this.page.getByRole('option', { name: emailType }).click();
    }

    async setEmail(email) {
        await this.emailInput.fill(email);
    }

    async submitEmailForm() {
        await this.saveButton.click();
    }

    async verifyEmailAdded() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Email successfully added' })).toBeVisible();
    }
}
module.exports = { EmailSettingsSection };