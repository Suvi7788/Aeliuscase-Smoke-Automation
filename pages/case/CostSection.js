const { Page } = require("@playwright/test");
require("./CaseSummarySection");
const { expect } = require("@playwright/test");

class CostSection {
    constructor(page) {
        this.page = page;
        this.requestGenaralCheckBtn = page.locator('button:has-text("Request General Check")');
        this.neededDateFill = page.locator('input[formcontrolname="neededDate"]');  
        this.amountInputFill = page.locator('#amountInput');
        this.saveBtn = page.getByText('Save', { exact: true });
        this.verifySaveSuccessMsgConfirm = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
    }

    async requestGenaralCheck() {
        await this.requestGenaralCheckBtn.click();
    }

    async neededDateInput(){
        // Step 1: Calculate today + 2 days
        const today = new Date();
        today.setDate(today.getDate() + 2);

        // Step 2: Format as yyyy-mm-dd (required for <input type="date">)
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        // Step 3: Fill the input
        await this.neededDateFill.fill(formattedDate);
    }

    async amountInput(){
        await this.amountInputFill.focus();
        await this.amountInputFill.press('ArrowUp');
    }

    async save(){
        await this.saveBtn.click();
    }

    async verifySaveSuccessMsg(){
        await expect(this.verifySaveSuccessMsgConfirm).toBeVisible();
    }
}

module.exports = CostSection;