const { expect } = require("@playwright/test");

class UsersPage {
    constructor(page) {
        this.page = page;
        this.createNewUserBtn = page.locator('button[ptooltip="Create New User"]');
        this.optionsBtn = page.locator('button[ptooltip="Options"]').first();
        this.editBtn = page.getByRole('menuitem', { name: 'Edit User' });
        this.saveBtn = page.locator('button:has-text("Save")');
        this.saveSuccessMessage = page.locator('div.p-toast-message-text');
        this.viewBtn = page.getByRole('menuitem', { name: 'View User' });
        this.viewUser = page.locator('a').filter({ hasText: 'View User' })
    }

    async openCreateNewUser() {
        await this.createNewUserBtn.click();
    }
    
    async openOptions() {
        await this.optionsBtn.click();
    }

    async openEditUser() {
        await this.editBtn.click();
    }
    

    async saveProfile(){
        await this.saveBtn.click();
    }

    async saveSuccessMsg(){
        await expect(this.saveSuccessMessage).toBeVisible();
    }

    async openViewUser() {
        await this.viewBtn.click();
    }

    async verifyViewUserVisible(){
        await expect(this.viewUser).toBeVisible();
    }
}
module.exports = { UsersPage };