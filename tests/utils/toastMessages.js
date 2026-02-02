const { expect } = require('@playwright/test');

class ToastMessages {
    constructor(page) {
        this.page = page;
    }

    async verifyRestoreTask() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully Restore the task' })).toBeVisible();
    }
}
module.exports = { ToastMessages };