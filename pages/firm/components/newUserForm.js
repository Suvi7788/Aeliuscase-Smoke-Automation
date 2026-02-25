const { expect } = require("@playwright/test");


class NewUserForm {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('input[formcontrolname="firstName"]');
        this.lastNameInput = page.locator('input[formcontrolname="lastName"]');
        this.roleDropdownBtn = page.locator('p-dropdown[formcontrolname="roleId"]');
        this.roleDropdownSelect = page.getByRole('option', { name: 'User' });
        this.jobDropdownBtn = page.locator('p-dropdown[formcontrolname="jobId"]')
        this.jobDropdownSelect = page.getByRole('option', { name: 'Attorney at Law' });
        this.logOnInput = page.locator('input[formcontrolname="userName"]');
        this.passwordInput = page.locator('p-password[formcontrolname="password"] input[type="password"]');
        this.emailInput = page.locator('input[formcontrolname="email"]');
        this.saveNewUserBtn = page.getByRole('button', { name: 'Save' });
        this.successMessage = page.locator('div.p-toast-detail', { hasText: 'Successfully added the user' });
        this.editUserCheckbox = page.locator('p-checkbox[formcontrolname="personalCalendar"] .p-checkbox-box');  //This is personalCalendarCheckbox
    }

async fillNewUserForm(firstName, lastName, logOn, password, email) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.roleDropdownBtn.click();
        await this.roleDropdownSelect.click();
        await this.jobDropdownBtn.click();
        await this.jobDropdownSelect.click();
        await this.logOnInput.fill(logOn);
        await this.passwordInput.fill(password);
        await this.emailInput.fill(email);
    }

    async saveNewUser() {
        await this.saveNewUserBtn.click();
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }

    async editProfile() {
        await this.editUserCheckbox.click();
    }
}

module.exports = { NewUserForm };


