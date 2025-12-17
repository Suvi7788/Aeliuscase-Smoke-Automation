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
        this.AddApplicantPartyNoteBtn = this.page.locator('button.p-element.p-ripple.footer-label.p-button-rounded.p-button-success.p-button-text.px-0.p-button.p-component');
    }

    async openPartyForm() {
        await this.addPartyButton.click();
    }

    async selectPartyType(partyType) {
        this.partyType = partyType;
        await this.page.getByRole('complementary').getByText(partyType).click();
    }

    async verifyPartyCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${this.partyType} party was successfully added` })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }
    async verifyRecordCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `Record successfully created` })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }
    async verifyPartyUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${this.partyType} party was successfully update` })).toBeVisible();
        await expect(this.addPartyButton).toBeVisible();
    }

    async verifyEmployerApplicantUpdate(party) {
        await expect(this.page.locator('div.p-toast-detail', { hasText: `${party} successfully update` })).toBeVisible();
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

    async verifyPriorTreatmentDeletion() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'successfully deleted' })).toBeVisible();
    }

    async openPartyNoteForm() {
        await this.AddApplicantPartyNoteBtn.click();
    }

    //Verify Task Creation
    async verifyNoteCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }
}

module.exports = { PartiesPage };
