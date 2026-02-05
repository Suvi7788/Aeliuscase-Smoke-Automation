const { Page } = require("@playwright/test");
require("./CaseSummarySection");
const { expect } = require("@playwright/test");

class SettlementSection {
    constructor(page) {
        this.page = page;
        this.settlementBtn = page.locator('div.grid.gap-2.ng-star-inserted').locator('label').nth(0)
        this.hasSettlementBtn = page.locator('label.settlement-dollar-icon.has-settlement').first();
        this.hasNoSettlementBtn = page.locator('label.settlement-dollar-icon:not(.has-settlement)').first();
        this.addNewSettlementBtn = page.locator("//button[@class='p-element p-button p-component p-button-icon-only ng-star-inserted']")
        this.negotiatorDropdown = page.locator(':text-is("Select a Negotiator")')
        this.negotiatorDropdownSelect = page.locator('span').filter({ hasText: 'Name Not Entered - (Adjuster) Insurance Carrier - MEDICAL ACCESS NETWORK FRESNO' }).last()
        this.typeDropdown = page.getByRole('combobox', { name: /Select a Type/i })
        this.typeDropdownSelect = page.getByRole('option', { name: 'C & R' });
        this.amountInput = page.locator('input[formcontrolname="amount"]');
        this.PaymentStatusDropdown = page.locator('p-dropdown[formcontrolname="paymentStatusId"]');
        this.PaymentStatusDropdownSelect = page.locator('ul[role="listbox"] li[role="option"][aria-label="Paid"]');
        this.submittedOnInput = page.locator('p-calendar[formcontrolname="submittedDate"] input');
        this.approvedOnInput = page.locator('p-calendar[formcontrolname="approvedDate"] input');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.deleteBtn = page.locator("button[class='p-element p-button-danger p-button-sm p-button p-component p-button-icon-only ng-star-inserted'] span[class='p-button-icon pi pi-trash']");
        this.deleteConfirmBtn = page.locator('span').filter({ hasText: 'Proceed' }).last();
        this.deleteSuccessMessage = page.locator(':text-is("Settlement Deleted successfully!")')
        this.amountCell = page.locator('div.col-12').locator('div').nth(1);
        this.editBtn = page.locator('button[label="Edit"]');
        this.saveBtnInEdit = page.getByRole('button', { name: 'Save' });
        this.pdRatingsBtn = page.getByRole('button', { name: 'PD Ratings' });
    }


    async openHasSettlement() {
        await this.hasSettlementBtn.click();
    }
    async openNotHasSettlement() {
        await this.hasNoSettlementBtn.click();
    }
    async addNewSettlement() {
        await this.addNewSettlementBtn.click();
    }

    async selectNegotiator() {
        await this.negotiatorDropdown.click();
        await this.negotiatorDropdownSelect.click();
    }

    async selectType() {
        await this.typeDropdown.click();
        await this.typeDropdownSelect.click();
    }

    async enterAmount(amount) {
        await this.amountInput.fill(amount);
    }

    async selectPaymentStatus() {
        await this.PaymentStatusDropdown.click();
        await this.PaymentStatusDropdownSelect.click();
    }

    async saveSettlement() {
        await this.saveBtn.click();
    }

    async submittedOnDate() {
        // Step 1: Click on "Submitted On" date input
        await this.submittedOnInput.click();

        // Step 2: Get today's date number
        const today = new Date();
        const todayDay = today.getDate().toString();

        // Step 3: Click today's date in the calendar
        const todayDateCell = this.page.locator('td', {
            has: this.page.locator('span', { hasText: todayDay })
        }).first();

        await todayDateCell.click();
    }


    async approvedOnDate() {
        // Step 1: Click on "Add Task" button
        await this.approvedOnInput.click();

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

    async deleteSettlement() {
        await this.deleteBtn.click();
    }

    async deleteConfirm() {
        await this.deleteConfirmBtn.click();
    }

    async deleteSuccessMsg() {
        await expect(this.deleteSuccessMessage).toBeVisible();
    }

    async settlementView() {
        const amountText = await this.amountCell.textContent();
        if (!amountText || amountText.trim() === '$' || amountText.trim() === '') { throw new Error('Amount not filled - critical failure'); }
    }

    async editSettlement() {
        await this.editBtn.click();
        await this.amountInput.focus();
        await this.page.keyboard.press('ArrowUp');
        await this.saveBtnInEdit.click();
    }

    async openPDRatings() {
        await this.pdRatingsBtn.click();
    }

    

}
module.exports = SettlementSection;