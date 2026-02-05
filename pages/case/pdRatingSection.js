const { Page } = require("@playwright/test");
require("./CaseSummarySection");
const { expect } = require("@playwright/test");

class PDRatingSection {
    constructor(page) {
        this.page = page;
        this.newPdRatingBtn = page.locator('button[ptooltip="New Pd Rating"]');
        this.dateOfReportInput = page.locator('input[formcontrolname="reportedDate"]')
        this.drSelectDropDownBtn = page.locator('p-dropdown[formcontrolname="doctorId"]');
        this.drSelectSelect = page.locator('li[role="option"][aria-label="Dr. Ara"]');
        this.typeOfRPTDropDownBtn = page.locator('p-dropdown[formcontrolname="rptType"]');
        this.typeOfRPTSelectPersonal = page.locator('li[role="option"]', { hasText: 'PERSONAL' });
        this.saveBtn = page.locator('button', { hasText: 'Save' });
        this.verifySaveSuccessMsgConfirm = page.locator('div.p-toast-summary[data-pc-section="summary"]').last();
        this.pdRatingOption = page.locator("//tbody/tr[1]/td[1]/button[1]/span[1]")
        this.pdRatingEditBtn = page.locator('span:has-text("Edit PD Rating")')
        this.recommendedFutureMedicalCareInput = page.locator('textarea[formcontrolname="recommandations"]');
        this.pdRatingView = page.getByText('View PD Rating', { exact: true })
        this.verifyViewPDRatingConfirm = page.getByText('View PD Rating', { exact: true })
        this.deletePdRatingBtn = page.locator(`//tr[td[contains(., 'test')]]//td[6]//span`)
        this.deleteConfirmBtn = page.getByText('Proceed', { exact: true })
    }

    async addNewPdRating() {
        await this.newPdRatingBtn.click();
    }

    async selectDateOfReport() {
        // Step 1: Calculate today + 2 days
        const today = new Date();
        today.setDate(today.getDate() + 2);

        // Step 2: Format as yyyy-mm-dd (required for <input type="date">)
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        // Step 3: Fill the input
        await this.dateOfReportInput.fill(formattedDate);
    }

    async drSelect() {
        await this.drSelectDropDownBtn.click();
        await this.drSelectSelect.click();
    }

    async typeOfRPTSelect() {
        await this.typeOfRPTDropDownBtn.click();
        await this.typeOfRPTSelectPersonal.click();
    }

    async savePdRating() {
        await this.saveBtn.click();
    }

    async verifySaveSuccessMsg() {
        await expect(this.verifySaveSuccessMsgConfirm).toBeVisible();
    }

    async clickPDRatingOption() {
        await this.pdRatingOption.click();
    }

    async updatePdRating() {
        await this.pdRatingEditBtn.click();
    }
    async addRecommendedFutureMedicalCare(recommendedFutureMedicalCareTxt) {
        await this.recommendedFutureMedicalCareInput.fill(recommendedFutureMedicalCareTxt);
    }

    async viewPDRating() {
        await this.pdRatingView.click();
    }

    async verifyViewPDRating() {
        await expect(this.verifyViewPDRatingConfirm).toBeVisible();
    }

}

module.exports = PDRatingSection;


