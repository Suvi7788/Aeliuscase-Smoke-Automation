const { Page } = require("@playwright/test");
const ReferforVocationalServicesForm = require("../components/ReferforVocationalServicesForm");


class CaseSummarySection {
    constructor(page) {
        this.page = page;
        this.ReferforVocationalServices = page.locator('//span[normalize-space()="Refer for Vocational Services"]');
        this.caseEdit = page.getByText('Edit Case', { exact: true });


    }

    async viewReferforVocationalServicesForm() {
        await this.ReferforVocationalServices.click();

    }

    async openCaseEdit(){
        await this.caseEdit.click();
    }


}

module.exports = CaseSummarySection;
