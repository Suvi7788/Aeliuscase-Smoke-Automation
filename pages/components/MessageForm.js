class MessageForm {
    constructor(page) { 
        const ForFiled = "//li[@role='option']//input[@role='combobox']";
        

        this.page = page;
        this.CaseNo = page.getByRole('complementary').locator('input[name="undefined"]')
        this.CaseValue = page.locator('span:has-text("AE00147 - Automation vs DO NOT DELETE")');
        this.ForField = page.locator(ForFiled)
        this.ForValue = page.getByRole('option', { name: 'suvi dison' });
        this.Details = page.locator('div.ql-editor.ql-blank')
        this.SaveBtn = page.getByRole('button', { name: 'Save' });

        // Add date-related selectors
        this.WhenField = page.locator('input[placeholder="MM/DD/YYYY"]').first(); 
        this.TimeField = page.locator('input[placeholder="HH:MM AA"]'); // Time input
        this.DatePickerIcon = page.locator('span.pi-calendar'); // Calendar icon
        this.FutureDateOption = page.locator('td:has-text("15")'); // Example: Select 15th of the month
        
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
}   
module.exports = { MessageForm };