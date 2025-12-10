const { expect } = require("@playwright/test");

class WcabCaseForm {
    constructor(page) {
        this.page = page;
        this.caseTypeDropdown = page.locator('span[role="combobox"][aria-label="Select from List"]');
        this.caseTypeOption = page.getByRole('option', { name: 'WCAB', exact: true });
        this.nextBtn = page.locator('button', { hasText: 'Next' });
        this.applicationSection = page.locator('span.header-title', { hasText: 'Applicant Details' });
        this.applicantSalutation = page.locator('span[role="combobox"].p-dropdown-label-empty');
        this.applicantFirstName = page.locator('input[placeholder="First Name"]');
        this.applicantLastName = page.locator('input[placeholder="Last Name"]');
        this.applicantSalutationOption = page.getByRole('option', { name: 'Mr', exact: true });
        this.companyName = page.locator('p-autocomplete[formcontrolname="company"] input[role="combobox"]');
        this.DOI = page.locator('input[formcontrolname="doiStart"]');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });

    }
    async createCase(firstName, lastName, companyName) {
        await this.caseTypeDropdown.click();
        await this.caseTypeOption.waitFor();
        await this.caseTypeOption.click();
        await this.nextBtn.click();
        await this.applicationSection.waitFor();
        await this.applicantFirstName.fill(firstName);
        await this.applicantLastName.fill(lastName);
        await this.applicantSalutation.click();
        await this.applicantSalutationOption.click();
        await this.nextBtn.click();
        await this.companyName.fill(companyName);
        await this.nextBtn.click();
        await this.DOI.fill('2025-12-01');
        await this.submitBtn.click();

    }

    async verifyCaseCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully created the case' })).toBeVisible();
    }
}
module.exports = { WcabCaseForm };