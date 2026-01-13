const messageData = require("../../data/messageData.json");

class MessageForm {
    constructor(page) {
        this.page = page;
        this.CaseNo = page.locator('p-autocomplete[formcontrolname="phoneCallMessageCases"] input');
        this.CaseValue = page.locator('span:has-text("AE00147 - Automation vs DO NOT DELETE")');
        this.ForField = page.getByRole('combobox').nth(3);
        this.ForValue = page.getByRole('option', { name: messageData.AssigneeValue });
        this.Details = page.locator('div.ql-editor');
        this.SaveBtn = page.getByRole('button', { name: 'Save' });

        // Add date-related selectors
        this.WhenField = page.locator('input[placeholder="MM/DD/YYYY"]').first();
        this.TimeField = page.locator('input[placeholder="HH:MM AA"]'); // Time input
        this.DatePickerIcon = page.locator('span.pi-calendar'); // Calendar icon
        this.FutureDateOption = page.locator('td:has-text("15")'); // Example: Select 15th of the month

        // Add task selectors
        this.AddTaskBtn = page.getByRole('combobox').nth(5);
        
        // Add task assignee 
        this.addTaskAssignee = page.locator('p-autocomplete[formcontrolname="caseTaskAssigneeId"] input[role="combobox"]');

        this.ClickAssigneeValue = page.locator('span.p-column-title', { hasText: 'Raj Patel' });

    }

    async fillMessageForm(caseNo, user, Details, dateOffset = 1) {
        await this.CaseNo.click();
        await this.CaseNo.fill(caseNo);
        await this.CaseValue.click();
        await this.ForField.click();
        await this.ForField.fill(user);
        await this.ForValue.click();
        await this.Details.click();
        await this.Details.fill(Details);

        // Select a future date (so it appears in Message tile)
        //await this.selectFutureDate(dateOffset);

    }

    async editMessageDetails(newDetails) {
        await this.Details.fill(newDetails);
    }

    async selectFutureDate(daysFromNow = 1) {
        // Click on the When field to open date picker
        await this.WhenField.click();

        // Wait for date picker to appear
        await this.page.waitForTimeout(500);

        // Calculate future date
        const futureDate = this.getFutureDate(daysFromNow);

        // Method 1: Direct input (if allowed)
        await this.WhenField.fill(futureDate.formatted);

        // OR Method 2: Use date picker navigation
        // await this.selectDateFromPicker(futureDate);

        // Set time (optional)
        await this.TimeField.click();
        await this.TimeField.fill('10:00 AM');

    }


    getFutureDate(daysFromNow) {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + daysFromNow);

        return {
            date: futureDate,
            formatted: this.formatDate(futureDate),
            day: futureDate.getDate(),
            month: futureDate.getMonth() + 1, // 0-indexed
            year: futureDate.getFullYear()
        };
    }

    formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    async submitMessageForm() {
        await this.SaveBtn.click();

    }

    async updateMessageDetails(newDetails) {
        // Focus on details field
        await this.Details.click();

        // Clear existing text
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');

        // Enter new details
        await this.editDetails.fill(newDetails);
    }

    async fillAddTask() {
    // Step 1: Click on "Add Task" button
    await this.AddTaskBtn.click();

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

async fillAssignee() {
    await this.addTaskAssignee.click();
    await this.addTaskAssignee.fill(messageData.AssigneeClick);
}

async assigneeClick() {
    await this.ClickAssigneeValue.click();
}


// Test 2: Save Message as Task (separate test)
async fillMessageAsTaskTest() {
    // First create the message
    await this.fillMessageForm(messageData.caseNo, messageData.user, messageData.Details);   
}


}
module.exports = { MessageForm };