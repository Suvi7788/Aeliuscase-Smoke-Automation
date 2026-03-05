const { expect } = require("@playwright/test");

class RolodexPage {
    constructor(page) {
        this.page = page;
        this.addCompanyBtn = page.getByRole('button', { name: 'New Company' });
        this.addPeopleBtn = page.getByRole('button', { name: 'New Person' });
        this.optionBtn = page.locator('button[ptooltip="Options"]').first();
        this.editBtn = page.getByRole('menuitem', { name: 'Edit' });
        this.filterByType = page.getByRole('combobox', { name: 'Filter by Type' });
        this.filterByTypeOptionCompany = page.getByRole('option', { name: 'Attorney' });
        this.editRolodexCommentFill = page.locator('textarea[formcontrolname="comments"]');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.verifyRolodexEditedSuccessMsgVisible = page.locator('div.p-toast-detail', { hasText: 'Rolodex edited successfully' });
        this.filterByTypeOptionPerson = page.getByRole('option', { name: 'Person' });
        this.editRolodexCommentFillPerson = page.locator('input[formcontrolname="spouse"]')
        this.personEditConfirmBtn = page.getByRole('button', { name: 'Yes' })
        this.viewBtn = page.getByRole('menuitem', { name: 'View' })
        this.viewConfirm = page.getByText('View Person');
        this.viewConfirmCompany = page.getByText('View Company');
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

    async filterByTypeClick() {
        await this.filterByType.click();
    }

    async filterByTypeOptionSelectCompanyClick() {
        await this.filterByTypeOptionCompany.click();
    }

    async option() {
        await this.optionBtn.click();
    }
    async edit() {
        await this.editBtn.click();
    }
    async editRolodexComment() {
        await this.editRolodexCommentFill.fill('Test comment');
    }
    async saveRolodex() {
        await this.saveBtn.click();
    }
    async verifyRolodexEditedSuccessMsg() {
        await expect(this.verifyRolodexEditedSuccessMsgVisible).toBeVisible();
    }
    async filterByTypeOptionSelectPersonClick() {
        await this.filterByTypeOptionPerson.click();
    }
    async editRolodexCommentPerson() {
        await this.editRolodexCommentFillPerson.fill('Test comment');
    }
    async personEditConfirm() {
        await this.personEditConfirmBtn.click();
    }
    async view() {
        await this.viewBtn.click();
    }
    async viewVerifyPerson() {
        await expect(this.viewConfirm).toBeVisible();
    }
    async viewVerifyCompany() {
        await expect(this.viewConfirmCompany).toBeVisible();
    }

}

module.exports = { RolodexPage };
