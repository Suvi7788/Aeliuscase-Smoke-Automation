const { expect } = require("@playwright/test");

class ActivitySection {
    constructor(page) {
        this.page = page;
        this.activityBtn = page.locator('button[ptooltip="Add a Activity"]');
        this.editBtn = page.locator('button[ptooltip="Edit Activity"]').first();
        this.optionsBtn = page.locator('button[ptooltip="Options"]').first();
        this.editActivityBtn = page.getByRole('menuitem', { name: 'Edit Activity' });
        this.deleteActivityBtn = page.locator('button:has(.pi-trash)').first();
        this.deleteConfirmProceed = page.locator('button:has-text("Proceed")');
        this.deleteSuccessMsg = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
        this.viewDeletedActivitiesBtn = page.getByRole('button', { name: 'Show Deleted Activities' });
        this.viewDeletedActivitiesTableVisible = page.getByRole('table');
    }
    async addNewActivity() {
        await this.activityBtn.click();
    }
   async editActivityBtnClick() {
    await this.editBtn.click();
   }
   async clickOptions() {
    await this.optionsBtn.click();
   }
   async editActivityClick() {
    await this.editActivityBtn.click();
   }
   async deleteActivityClick() {
    await this.deleteActivityBtn.click();
   }
   async deleteConfirm() {
    await this.deleteConfirmProceed.click();
   }
   async verifyDeleteActivitySuccess() {
    await expect(this.deleteSuccessMsg).toBeVisible();
   }
   async viewDeletedActivities() {
    await this.viewDeletedActivitiesBtn.click();
   }
   async verifyDeletedActivitiesTable() {
    await expect(this.viewDeletedActivitiesTableVisible).toBeVisible();
   }
    
}
module.exports = { ActivitySection };
