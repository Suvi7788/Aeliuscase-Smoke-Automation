const { Page } = require("@playwright/test");
const ReferforVocationalServicesForm = require("./components/ReferforVocationalServicesForm");


class CaseSummaryPage {
    constructor(page) {
        this.page = page;
        this.ReferforVocationalServices = page.locator('//span[normalize-space()="Refer for Vocational Services"]');


    }

    async viewReferforVocationalServicesForm() {
        await this.ReferforVocationalServices.click();

    }
}

module.exports = { CaseSummaryPage };
