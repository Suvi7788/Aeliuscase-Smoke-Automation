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
        this.editFeeOption = page.locator('li[role="menuitem"] >> text=Edit Fee');
        this.feeRows = page.locator('tr:has(button[ptooltip="Delete Fee"])');
        this.commentBox = page.locator('textarea[formcontrolname="comment"]');
        this.feeDeleteBtn = page.locator('button[ptooltip="Delete Fee"]').first();
        this.deleteConfirmBtn = page.locator('button.p-confirm-dialog-accept');
        this.editFeeSuccessMsg = page.locator(':text-is("Success")')
        this.addPaymentBtn = page.locator('button[label="Add Payment"]');
        this.paymentAmountInput = page.locator('input[formcontrolname="payment"]');

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
    
    async openEditFeeForUnpaidRow() {

    // Loop through each fee row
    for (let i = 0; i < await this.feeRows.count(); i++) {

        const row = this.feeRows.nth(i);

        // Delete button is visible ONLY for unpaid fees
        const deleteBtn = row.locator('button[ptooltip="Delete Fee"]');

        const isUnpaid = await deleteBtn.isVisible().catch(() => false);

        if (isUnpaid) {
            console.log(`Unpaid fee found at row index: ${i}`);

            // Locate Options (three dots) button INSIDE THIS ROW
            const optionsBtn = row.locator('button[ptooltip="Options"]');
            await optionsBtn.scrollIntoViewIfNeeded();
            await optionsBtn.click();

            // Click Edit Fee from menu (assuming editFeeOption is already defined)
            await this.editFeeOption.click();

            return; // stop after first editable fee
        }
    }

    // If loop finishes without finding unpaid fee
    throw new Error('No unpaid fee found to edit');
}

    async editBill(comment) {
        await this.commentBox.fill(comment);
        await this.saveBtn.click();
    }

    async deleteBill() {
        await this.feeDeleteBtn.scrollIntoViewIfNeeded();
        await this.feeDeleteBtn.click();
        await this.deleteConfirmBtn.click();
    }

    async editFeeSuccessMsgVisible() {
        await expect(this.editFeeSuccessMsg).toBeVisible();
    }

    async addPaymentToBill() {
        await this.addPaymentBtn.scrollIntoViewIfNeeded();
        await this.addPaymentBtn.click();
    }
    async enterPaymentAmount(amount) {
        await this.paymentAmountInput.fill(amount);
    }
}

module.exports = FeeSection;