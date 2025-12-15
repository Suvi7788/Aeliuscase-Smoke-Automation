class PartyForm {
    constructor(page) {
        this.page = page;
        this.companyNameInput = page.locator('p-autocomplete[formcontrolname="company"] input');
        this.companyNameOption = page.getByRole('option', { name: /Med/i }).first();
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.commentInput = page.locator('textarea[formcontrolname="comments"]');
    }

    async fillPartyForm(companyName) {
        await this.companyNameInput.fill(companyName);
        await this.companyNameOption.click();
    }

    async savePartyForm() {
        await this.saveButton.click();
    }

    async updatePartyForm(comment) {
        await this.commentInput.fill(comment);
    }
}

module.exports = { PartyForm };