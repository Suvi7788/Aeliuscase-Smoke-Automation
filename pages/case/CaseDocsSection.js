class CaseDocsSection {
    constructor(page) {
        this.page = page;
this.addDocsBtn = this.page.locator('button[ptooltip="Add Documents"]');
    }

    async openAddDocsForm() {
        await this.addDocsBtn.click();
    }
}
module.exports = { CaseDocsSection };