const { expect } = require('@playwright/test');

class CaseDashboardPage {
    constructor(page) {
        this.page = page;
        this.container = this.page.getByText('Case Number: |');
        this.AddEventBtn = this.page.getByRole('button', { name: 'Create New Event' });
    }

    //!!!!!NEED TO GET CSS ID TO VERIFY
    async verifyNavigationToCase() {
        await expect(this.container).toContainText('AE00147');

    }

    //Open Event Form From Case Dashboard
    async openEventForm() {
        await this.AddEventBtn.click();
    }

    async createCaseDashboardEvent(caseNo, Subject, Assignee, Description) {
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }

    async verifyEventCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();
    }
}
module.exports = { CaseDashboardPage };
