const { expect } = require("@playwright/test");

class CaseActivitySection {
    constructor(page) {
        this.page = page;
        this.addTaskBtn=page.getByRole('button', { name: 'Add Task' });
        this.addEventBtn=page.getByRole('button', { name: 'Add Event' });
        this.addNoteBtn=page.getByRole('button', { name: 'Add Note' });
    }

    async openAddTaskForm(){
        await this.addTaskBtn.click();
    }

    async openAddEventForm(){
        await this.addEventBtn.click();
    }

    async openAddNoteForm(){
        await this.addNoteBtn.click();
    }

    async verifyEventCreation(){
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();
    }

    async verifyRecordCreation(){
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

}