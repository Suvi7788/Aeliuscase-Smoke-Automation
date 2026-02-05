class PartyForm {
    constructor(page) {
        this.page = page;
        this.companyNameInput = page.locator('p-autocomplete[formcontrolname="company"] input');
        this.companyNameInputRolodex = page.locator('button[placeholder="company"]');
        this.companyInput = page.locator('[formcontrolname="company"]');

        this.companyNameOption = page.getByRole('option', { name: /Med/i }).first();
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.commentInput = page.locator('textarea[formcontrolname="comments"]');
        this.applicantAddress = page.getByRole('textbox', { name: 'Street' });
        this.addPriorTreatmentProvidersBtn = page.locator("//button[@ptooltip='Add a new prior treatment providers']");
        this.priorTreatmentSaveBtn = page.getByRole('dialog').getByRole('button', { name: 'Save' });
        this.priorTreatmentDoctorInput = page.locator('input[formcontrolname="doctor"]');
        this.editPriorTreatmentButton = this.page.getByRole('button', { name: 'Edit', exact: true });
        this.editPartyButton = page.locator('button[ptooltip="Edit"]').first();
        this.deletePriorTreatmentProviderButton = page.locator('button[ptooltip="Delete"]').first();
        this.deletePriorTreatmentProviderConfirmButton = page.locator('button.p-confirm-dialog-accept');
        this.editPartyButton = page.getByText('Edit', { exact: true });
        this.applicantFirstName = page.locator('input[placeholder="First Name"]');
        this.applicantLastName = page.locator('input[placeholder="Last Name"]');
        this.addMedicalBillingBtn = page.locator('button[ptooltip="New Medical Billing"]').first();
        this.selectedDOIs = page.locator('p-multiselect[formcontrolname="selectedDOIs"]');
        this.selectAllDOIs = page.locator('.p-checkbox-box[aria-label="All items unselected"]');
        this.billed = page.locator('input[formcontrolname="billed"]');
        this.saveMedicalBillingBtn = page.locator('app-medical-billing-crud').getByRole('button', { name: 'Save' });
        this.optionsBtn = page.locator('button[ptooltip="Options"]').first();
        this.editMedicalBillBtn = page.getByText('Edit Medical Bill');
        this.deleteBillBtn = page.locator('button[ptooltip="Delete Bill"]').first();
        this.deleteBillConfirmButton = page.getByRole('button', { name: 'Proceed' });

    }
    async fillPartyForm(companyName, isFromRolodex) {

        await this.companyInput.fill(companyName);

        if (!isFromRolodex) {
            await this.companyNameOption.click();
            this.page.isFromRolodex = isFromRolodex;
        }
    }

    async fillPriorTreatmentForm(companyName, doctorName) {
        await this.companyNameInput.fill(companyName);
        await this.companyNameOption.click();
        await this.priorTreatmentDoctorInput.fill(doctorName);
    }

    async savePartyForm() {
        await this.saveButton.click();
    }

    async savePriorTreatmentForm() {
        await this.priorTreatmentSaveBtn.click();
    }

    async updatePartyForm(comment) {
        await this.commentInput.fill(comment);
    }
    async updateApplicantAddress(street) {
        await this.applicantAddress.fill(street);
    }
    async openAddPriorTreatmentProviderForm() {
        await this.addPriorTreatmentProvidersBtn.click();
    }


    async navigateToEditPriorTreatment() {
        await this.editPartyButton.click();
        await this.editPriorTreatmentButton.click();
    }

    async deletePriorTreatmentProvider() {
        await this.deletePriorTreatmentProviderButton.click();
        await this.deletePriorTreatmentProviderConfirmButton.click();
    }

    async navigateToEditParty() {
        await this.editPartyButton.click();
    }

    async fillRolodexPeopleForm(firstName, lastName) {
        await this.applicantFirstName.fill(firstName);
        await this.applicantLastName.fill(lastName);
    }

    async addMedicalBilling() {
        await this.addMedicalBillingBtn.click();
    }

    async fillMedicalBillingForm(billValue) {
        await this.selectedDOIs.click();
        await this.selectAllDOIs.click();
        await this.billed.fill(billValue);
    }

    async saveMedicalBillingForm() {
        await this.saveMedicalBillingBtn.click();
    }

    async navigateToEditMedicalBill() {
        await this.optionsBtn.click();
        await this.editMedicalBillBtn.click();
    }

    async updateMedicalBillForm() {
        await this.billed.click();
        await this.page.keyboard.press('ArrowUp');
    }

    async deleteMedicalBill() {
        await this.deleteBillBtn.click();
        await this.deleteBillConfirmButton.click();
    }


}
module.exports = { PartyForm };