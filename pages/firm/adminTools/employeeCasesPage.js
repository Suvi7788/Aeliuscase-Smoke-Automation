const { expect } = require("@playwright/test");

class EmployeeCasesPage {
    constructor(page) {
        this.page = page;
        this.employeeTable = page.locator('#pn_id_940-table');
        this.individualEmployeeTable = page.locator('span.header-title', { hasText: 'Aditi Mandal' });
        this.listBtn = page.getByRole('button', { name: 'List' }).first();
        this.printBtn = page.getByRole('button', { name: 'Print' });
        this.secondPrintBtn = page.getByRole('button', { name: 'Print' }).last();
        this.clickAwayFromAdminToolsBtn = page.locator('span.header-title')
    }
    
    async verifyEmployeeCasesListLoads() {
        await this.employeeTable.isVisible();
    }
    async verifyIndividualEmployeeCasesListLoads() {
        await this.listBtn.click();
        await this.individualEmployeeTable.isVisible();
    }

    async clickAwayFromAdminTools(){
        await this.clickAwayFromAdminToolsBtn.click();     //adding this because of the admintools are not closing after the action
    }

    async printEmployeeCasesList() {
        await this.printBtn.click();
    }
    async verifyPrintEmployeeCasesList() {
        await expect(this.secondPrintBtn).toBeVisible();
        await this.secondPrintBtn.click();
    }
}
module.exports = { EmployeeCasesPage };