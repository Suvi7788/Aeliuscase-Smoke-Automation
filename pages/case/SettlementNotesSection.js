const { Page } = require("@playwright/test");
const { expect } = require("@playwright/test");
const routes = require('../../config/routes');
const endpoints = require('../../config/endpoints');
const { BasePage } = require('../BasePage');


class SettlementNotesSection {
    constructor(page) {
        this.page = page;
        this.addNewSettlementNote = page.locator('button[ptooltip="New Settlement Note"]');
        this.options = page.locator('button[ptooltip="Options"]').first(); // need to change this locator form devloper
        this.edit = page.getByRole('menuitem', { name: 'Edit Note' });
        this.view = page.getByRole('menuitem', { name: 'View Note' });
        this.viewNote = page.getByRole('toolbar').getByText(/View Note/);
        this.delete = page.locator('button[ptooltip="Delete Note"]').first();
        this.deleteConfirm = page.getByRole('button', { name: 'Proceed' });
        this.deleteSettlementNoteSuccessMessage = page.locator('div.p-toast-detail', { hasText: 'Settlement Note Deleted successfully!' });
        this.printSettlementNoteListBtn = page.getByRole('button', { name: 'Print Notes' })
        this.printBtn = page.locator('button[label="Print"]');
        this.basePage = new BasePage(page);
        
    }

    async openAddNewSettlementNote(){
        await this.addNewSettlementNote.click();
    }

    async clickOptions(){
        await this.options.click();   // need to change this locator form devloper
    }
    async clickEdit(){
        await this.edit.click();
    }
    async clickview(){
        await this.view.click();
    }
    async verifyViewNote(){
        await expect(this.viewNote).toBeVisible();
    }
    async clickDelete(){
        await this.delete.click();
    }
    async clickDeleteConfirm(){
        await this.deleteConfirm.click();
    }
    async verifyDeleteSettlementNoteSuccessMessage(){
        await expect(this.deleteSettlementNoteSuccessMessage).toBeVisible();
    }
    async printNoteList(){
        await this.printSettlementNoteListBtn.click();
    }
    async verifyPrintNoteList(){
        await expect(this.printBtn).toBeVisible();
        await this.printBtn.click();
    } 
    async verifyNoteInSettlementNoteList(caseId, apiUrl) {
        await this.basePage.gotoAndWaitForAPI(routes.caseDashboard(caseId), apiUrl);
    }
    

}

module.exports = SettlementNotesSection;
