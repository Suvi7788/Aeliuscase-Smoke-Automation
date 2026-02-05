const { expect } = require('@playwright/test');

class NoteForm {
    constructor(page) {
        this.page = page;
        this.Description = page.locator(".ql-editor");
        this.SaveBtn = page.getByRole('button', { name: 'Save' });

        // Add task assignee 
        this.addTaskAssignee = page.locator("//div[@class='p-element p-multiselect-label-container']");

        this.ClickAssigneeValue = page.locator("//span[normalize-space()='Raj Patel']");

        this.addTaskAssigneeMessageList = page.locator('p-calendar[formcontrolname="taskDate"] input[role="combobox"]');

        this.addTaskAssigneefill = page.locator("//input[@role='searchbox']");
        this.noteViewVerify = page.getByText('View Note ');

    }
    async fillNoteForm(Description) {
        await this.Description.fill(Description);
    }
    async submitNoteForm() {
        await this.SaveBtn.click();
    }

    async fillAddTask() {
        // Step 1: Click on "Add Task" button
        await this.addTaskAssigneeMessageList.click();

        // Step 2: Calculate tomorrow's date (today + 1 day)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowDay = tomorrow.getDate().toString();

        // Step 3: Find and click on tomorrow's date in the calendar
        // Try multiple strategies to find the date cell

        // Strategy 1: Direct text match
        try {
            const dateCell = this.TomorrowDate.first();
            await dateCell.click();
        } catch (error) {
            // Strategy 2: Search in all table cells
            const allCells = await this.page.locator('td').all();
            for (const cell of allCells) {
                const cellText = await cell.textContent();
                if (cellText.trim() === tomorrowDay) {
                    await cell.click();
                    break;
                }
            }
        }
    }

    async fillAssignee(AssigneeClick) {
        await this.addTaskAssignee.click();
        await this.addTaskAssigneefill.fill(AssigneeClick);
    }

    async assigneeClick() {
        await this.ClickAssigneeValue.click();
    }

    // Test 2: Save Message as Task (separate test)
    async fillMessageAsTaskTest() {
        // First create the message
        await this.fillMessageForm(noteData.caseNo, noteData.user, noteData.Details);
    }

    async verifyNoteView() {
        await expect(this.noteViewVerify).toBeVisible();
    }

    async editNote(updatedDescription) {
        await this.Description.fill(updatedDescription + Date.now());
    }
}
module.exports = { NoteForm };