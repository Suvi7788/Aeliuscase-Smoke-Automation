class RecentCasePage {
    constructor(page) {
        this.page = page;
        this.createCaseBtn = page.locator("//button[@ptooltip='Open a Case']");
    }

    async openCaseForm() {
        await this.createCaseBtn.click();
    }
}
module.exports = { RecentCasePage };
