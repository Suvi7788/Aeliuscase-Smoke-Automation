const { expect } = require("@playwright/test");

class CaseEdit {
    constructor(page) {
        this.page = page;
        
        // Input field locator
        this.OtherStaffEdit = page.locator(
          "[formcontrolname='caseOtherStaffName'] input[placeholder='Search']"
        );
        
        // Clear button locator
        this.OtherStaffClear = page.locator(
          "[formcontrolname='caseOtherStaffName'] span.p-autocomplete-clear-icon"
        );
        
        // Selection option
        this.OtherStaffEditSelect = page.getByText('suvi dison', { exact: true });
        this.saveBtn = page.getByText('Save', { exact: true });
        this.successMessage = page.getByText('case updated', { exact: true });
    }

    async EditOtherStaff(){
        // Check if there's already a value in the field
        const currentValue = await this.OtherStaffEdit.inputValue();
        
        // Click the field first to focus
        await this.OtherStaffEdit.click();
        
        if (currentValue.trim() !== "") {
            // If there's a value, clear it first
            console.log("Clearing existing value:", currentValue);
            
            // Method 1: Use the clear button if visible
            if (await this.OtherStaffClear.isVisible()) {
                await this.OtherStaffClear.click();
            } 
            // Method 2: Select all and delete
            else {
                await this.OtherStaffEdit.press('Control+A');
                await this.OtherStaffEdit.press('Delete');
            }
            
        } else {
            console.log("Field is empty, no need to clear");
        }
        
        // Enter new value
        await this.OtherStaffEdit.fill("suvi");
        
        // Wait for dropdown to appear
        await this.page.waitForTimeout(1000);
        
        // Select the option
        await this.OtherStaffEditSelect.click();
    }
    
    async saveCaseEdit(){
        await this.saveBtn.click();
    }
    
    async verifyCaseEditSuccess(){
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = CaseEdit;