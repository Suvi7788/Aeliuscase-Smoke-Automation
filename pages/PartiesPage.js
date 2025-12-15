const { PartyForm } = require("./components/PartyForm");
const { expect } = require("@playwright/test");

class PartiesPage {
    constructor(page) {
        this.page = page;
        this.addPartyButton = page.locator('button[ptooltip="Add a new party"]');
        this.editPartyButton = page.getByText('Edit', { exact: true });
        this.partyForm = new PartyForm(page);
        this.deletePartyButton = page.locator('button[ptooltip="Click to delete party from this case"]');
        this.deletePartyConfirmButton = page.getByRole('button', { name: 'Proceed' });
    }

    async openPartyForm() {
        await this.addPartyButton.click();
    }

    async selectPartyType(partyType) {
        this.partyType = partyType;
        await this.page.getByRole('complementary').getByText(partyType).click();
    }

    async verifyRecordCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${this.partyType} party was successfully added` })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }
    async verifyRecordUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${this.partyType} party was successfully update` })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }
    async openCreatedParty(partyType) {
        this.partyType = partyType;
        await this.page.getByText(partyType).first().click();
    }
    async navigateToEditParty() {
        await this.editPartyButton.click();
    }

    // async deleteParty() {
    //     await this.deletePartyButton.click();
    //     await this.deletePartyConfirmButton.click();
    // }
    async deleteParty(partyName) {
        const partyHeader = this.page
            .locator('.p-panel-header')
            .filter({ hasText: partyName });

        await expect(partyHeader).toHaveCount(1);

        await partyHeader
            .locator('button[ptooltip="Click to delete party from this case"]')
            .click();

        await this.deletePartyConfirmButton.click();
    }



    async verifyRecordDeletion() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Party successfully Deleted' })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }
}

module.exports = { PartiesPage };
