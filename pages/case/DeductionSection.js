const { Page } = require("@playwright/test");
const { expect } = require("@playwright/test");

class DeductionSection {
    constructor(page) {
        this.page = page;
        this.addNewCostBtn = page.locator('button:has-text("New Cost")');
        this.amountInputFill = page.locator('input[formcontrolname="amount"]').nth(1);
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.verifySaveSuccessMsgConfirm = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
        this.optionsButton = page.locator('tr:has-text("View Deduction Cost") button[ptooltip="Options"]');
        this.viewDeductionBtn = page.locator('li[role="menuitem"] >> text=View Deduction Cost');
        this.editDeductionBtn = page.locator('li[role="menuitem"] >> text=Edit Deduction Cost');
        this.deleteDeductionBtn = page.locator('button[ptooltip="Delete Deduction Cost"]').first();
        this.proceedBtn = page.locator('button:has-text("Proceed")');
        this.deleteSuccessMsg = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
        

    }
    async openAddNewCost(){
        await this.addNewCostBtn.click();
    }
    async addAmount(){
        await this.amountInputFill.focus();
        await this.amountInputFill.press('ArrowUp');
    }
    async save(){
        await this.saveBtn.click();
    }
    async verifySaveSuccessMsg(){
        await expect(this.verifySaveSuccessMsgConfirm).toBeVisible();
    }
    async openOptions(){
        await this.optionsButton.click();
    }
    async viewDeduction(){
        await this.viewDeductionBtn.click();
    }
    async editDeduction(){
        await this.editDeductionBtn.click();
    }
    async deleteDeduction(){
        await this.deleteDeductionBtn.click();
    }
    async verifyDeleteConfirmation(){
       await this.proceedBtn.click();
    }
    async verifyDeleteSuccessMsg(){
        await expect(this.verifySaveSuccessMsgConfirm).toBeVisible();
    }

}

module.exports = DeductionSection;