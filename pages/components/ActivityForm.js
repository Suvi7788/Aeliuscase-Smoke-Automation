const { expect } = require("@playwright/test");

class ActivityForm {
    constructor(page) {
        this.page = page;
        this.activityTypeDropdown = page.locator('p-dropdown[formcontrolname="activityCategory"]');
        this.activityTypeDropdownSelect = page.getByRole('option', { name: 'Case' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.editActivityDescription = page.locator('.ql-editor[contenteditable="true"]');
        this.editBtn = page.getByRole('button', { name: 'Edit', exact: true })
        this.editActivitySuccess = page.getByText('Activity successfully Update');

    }
    async selectActivityType() {
        await this.activityTypeDropdown.click();
    }
    async selectActivityTypeClick() {
        await this.activityTypeDropdownSelect.click();
    }
    async saveActivity() {
        await this.saveBtn.click();
    }
    async editActivity(updatedDescription) {
        await this.editActivityDescription.fill(updatedDescription);
    }
    async editBtnClick() {
        await this.editBtn.click();
    }
    async verifyEditActivitySuccess() {
        await expect(this.editActivitySuccess).toBeVisible();
    }
}
module.exports = { ActivityForm };



