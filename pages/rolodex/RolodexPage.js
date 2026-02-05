const { expect } = require("@playwright/test");

class RolodexPage {
    constructor(page) {
        this.page = page;
        this.addCompanyBtn = page.getByRole('button', { name: 'New Company' });
        this.addPeopleBtn = page.getByRole('button', { name: 'New Person' });
    }

    async openAddCompanyForm() {
        await this.addCompanyBtn.click();
    }
    async openAddPeopleForm() {
        await this.addPeopleBtn.click();
    }

    async verifyRolodexCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Company added successfully' })).toBeVisible();
    }
}

module.exports = { RolodexPage };
