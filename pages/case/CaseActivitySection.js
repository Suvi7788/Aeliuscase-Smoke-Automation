const { expect } = require("@playwright/test");

class CaseActivitySection {
    constructor(page) {
        this.page = page;
        this.addEventBtn= page.locator('button[ptooltip="Add a Event"]'); 
        this.addTaskBtn = page.locator('button[ptooltip="Add a Task"]');
        this.addNoteBtn = page.locator('button[ptooltip="Add a Note"]');      
    }

    async openAddTaskForm() {
        await this.addTaskBtn.click();
    }

    async openAddEventForm() {
        await this.addEventBtn.click();
    }

    async openAddNoteForm() {
        await this.addNoteBtn.click();
    }

    async verifyEventCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();
    }

    async verifyRecordCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

}
module.exports = { CaseActivitySection };
