const { Page } = require("@playwright/test");
const { expect } = require("@playwright/test");

class ProfilePage {
    constructor(page) {
        this.page = page;
        this.viewProfile = page.locator('span.header-title:has-text("Edit User")');
        this.editUserCheckbox = page.locator('div.p-checkbox-box[data-pc-section="input"]').first();
        this.saveBtn = page.locator('button:has-text("Save")');
        this.saveSuccessMessage = page.locator('div.p-toast-message-text');
    }

    async verifyViewProfile(){
        await expect(this.viewProfile).toBeVisible();
    }

    async editProfile(){
        const isChecked =
        (await this.editUserCheckbox.getAttribute('data-p-highlight')) === 'true';

        if (isChecked) {
        // If ticked → untick
        await this.editUserCheckbox.click();
        } else {
        // If unticked → tick
        await this.editUserCheckbox.click();
        }
        
    }

    async saveProfile(){
        await this.saveBtn.click();
    }

    async saveSuccessMsg(){
        await expect(this.saveSuccessMessage).toBeVisible();
    }
}
module.exports = { ProfilePage };
