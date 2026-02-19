const { Page } = require("@playwright/test");
require("./CaseSummarySection");
const { expect } = require("@playwright/test");

class NegotiationSection {
    constructor(page) {
        this.page = page;
        this.negotiationSelectTypeDropdown = page.locator('p-dropdown[placeholder="Select Type"]');
        this.negotiationSelectTypeDropdownSelectSettlement = page.getByRole('option', { name: 'Settlement' })
        this.amountInput = page.locator('input#amountInput');
        this.saveBtn = page.getByText('Save', { exact: true })
        this.verifySaveSuccessMsgConfirm = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
        this.negotiationOption = page.locator('button[ptooltip="Options"][icon="pi pi-ellipsis-h"]');//need to add a correct locator for this
        this.viewNegotiation = page.getByText('View Negotiation', { exact: true })
        this.viewNegotiationVerify = page.getByText('View Negotiation - Counter Demand', { exact: true })
        this.deleteButton = page.locator("tbody tr:nth-child(1) td:nth-child(6) button:nth-child(1)")
        this.deleteConfirm = page.locator('button:has-text("Proceed")');
        this.deleteSuccessMsg = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
        this.searchInput = page.locator('input[placeholder="Search"]').nth(1);
        this.resultItem = page.getByText('Settlement', { exact: true }).first();
        this.addNewSettlementNoteBtn = page.locator('button[ptooltip="New Negotiation Note"]');
    }

    async selectType() {
        await this.negotiationSelectTypeDropdown.click();
        await this.negotiationSelectTypeDropdownSelectSettlement.click();
    }
    async addAmount() {
        await this.amountInput.focus();
        await this.amountInput.press('ArrowUp');
    }
    async saveNegotiation() {
        await this.saveBtn.click();
    }

    async verifySaveSuccessMsg() {
        await expect(this.verifySaveSuccessMsgConfirm).toBeVisible();
    }

    async clickNegotiationOption() {
        await this.negotiationOption.click();
    }
    async clickViewNegotiation() {
        await this.viewNegotiation.click();
    }
    async verifyViewNegotiation() {
        await expect(this.viewNegotiationVerify).toBeVisible();
    }
    async clickDeleteButton() {
        await this.deleteButton.click();
    }
    async clickDeleteConfirm() {
        await this.deleteConfirm.click();
    }
    async verifyDeleteSuccessMsg() {
        await expect(this.deleteSuccessMsg).toBeVisible();
    }
    async searchBarFill() {
        await this.searchInput.fill('settl');
    }
    async verifySearchBarFill() {
        await expect(this.resultItem).toBeVisible();
    }
    async openAddNewNegotiationNote(){
        await this.addNewSettlementNoteBtn.click();
    }
}

module.exports = NegotiationSection;
