const { Page } = require("@playwright/test");
require("./CaseSummarySection");
const { expect } = require("@playwright/test");


class FeeSection {
    constructor(page) {
        this.page = page;
        this.addNewBillBtn = page.locator('span').filter({ hasText: 'Add Bill' }).first()
        this.amountInput = page.locator('#amountInput')
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.viewFeesOptionBtn = page.locator('button:has(.pi-ellipsis-h)').first();
        this.viewFee = page.locator('button[ptooltip="Options"]').first();
        this.viewAttorneyFee = page.locator('span.header-title', {hasText: 'View Attorney Fee'});

    }


    async addNewBill() {
        await this.addNewBillBtn.click(); 
    }

    async enterAmount(amount) {
        await this.amountInput.fill(amount);
    }

    async saveBill() {
        await this.saveBtn.click();
    }

    async viewFeesOption(){
        await this.viewFeesOptionBtn.scrollIntoViewIfNeeded();
        await this.viewFeesOptionBtn.click();
    }

    async viewFeeClick(){
        await this.viewFee.click();
    }

    async viewAttorneyFeeVisible(){
        await expect(this.viewAttorneyFee).toBeVisible();
    }
    
}

module.exports = FeeSection;