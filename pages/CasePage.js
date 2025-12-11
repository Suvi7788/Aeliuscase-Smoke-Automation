const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class CasePage extends BasePage {
    constructor(page) {
        super(page);
        this.createCaseBtn = page.locator("//button[@ptooltip='Create New Case']");
    }

    async openCaseForm() {
        await this.createCaseBtn.click();
    }

    async verifyCaseList(type) {
        const url = routes.caseList(type);
        await this.gotoAndWaitForAPI(url, endpoints.getCaseList);
    }

}
module.exports = { CasePage };
